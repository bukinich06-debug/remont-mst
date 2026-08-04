import { addSubscriber, getSubscribers, removeSubscriber } from "./subscribers";

type TelegramUpdate = {
  update_id?: number;
  message?: {
    chat?: { id?: number };
  };
  my_chat_member?: {
    chat?: { id?: number };
    new_chat_member?: { status?: string };
  };
};

function getToken(): string | undefined {
  return process.env.TELEGRAM_BOT_TOKEN?.trim() || undefined;
}

export async function processTelegramUpdate(update: TelegramUpdate): Promise<void> {
  if (update.message?.chat?.id != null) {
    await addSubscriber(update.message.chat.id);
  }

  const member = update.my_chat_member;
  if (member?.chat?.id != null) {
    const status = member.new_chat_member?.status;
    if (status === "kicked" || status === "left") {
      await removeSubscriber(member.chat.id);
    } else if (status === "member" || status === "administrator") {
      await addSubscriber(member.chat.id);
    }
  }
}

/**
 * Local/dev helper when webhook is not set: pull pending getUpdates into Redis.
 * On Vercel with webhook, Telegram sends updates to /api/telegram/webhook instead.
 */
export async function syncSubscribersFromUpdates(): Promise<void> {
  const token = getToken();
  if (!token) return;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?timeout=0`);
    if (!res.ok) return;

    const data = (await res.json()) as {
      ok?: boolean;
      result?: TelegramUpdate[];
      description?: string;
    };

    // Active webhook makes getUpdates return 409 — ignore, webhook handles storage.
    if (!data.ok || !Array.isArray(data.result)) return;

    let maxId = 0;
    for (const update of data.result) {
      if (typeof update.update_id === "number" && update.update_id > maxId) {
        maxId = update.update_id;
      }
      await processTelegramUpdate(update);
    }

    if (maxId > 0) {
      await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=${maxId + 1}&timeout=0`);
    }
  } catch (err) {
    console.error("Failed to sync Telegram subscribers", err);
  }
}

export async function broadcastMessage(text: string): Promise<{ sent: number; total: number }> {
  const token = getToken();
  if (!token) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN");
  }

  await syncSubscribersFromUpdates();
  const subscribers = await getSubscribers();

  if (subscribers.length === 0) {
    return { sent: 0, total: 0 };
  }

  let sent = 0;

  await Promise.all(
    subscribers.map(async (chatId) => {
      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        });

        const data = (await tgRes.json().catch(() => null)) as {
          ok?: boolean;
          error_code?: number;
        } | null;

        if (tgRes.ok && data?.ok) {
          sent += 1;
          return;
        }

        // User blocked the bot
        if (data?.error_code === 403) {
          await removeSubscriber(chatId);
        } else {
          console.error("Telegram sendMessage failed", chatId, data);
        }
      } catch (err) {
        console.error("Telegram sendMessage error", chatId, err);
      }
    }),
  );

  return { sent, total: subscribers.length };
}
