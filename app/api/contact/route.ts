import { NextResponse } from "next/server";
import { broadcastMessage } from "@/lib/telegram/bot";
import { hasSubscriberStore } from "@/lib/telegram/subscribers";

const MAX_NAME = 100;
const MAX_PHONE = 40;
const MAX_MESSAGE = 1000;

type ContactBody = {
  name?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields; respond OK without sending.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !phone) {
    return NextResponse.json({ error: "Укажите имя и телефон" }, { status: 400 });
  }

  if (name.length > MAX_NAME || phone.length > MAX_PHONE || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Слишком длинные данные" }, { status: 400 });
  }

  if (!process.env.TELEGRAM_BOT_TOKEN?.trim() || !hasSubscriberStore()) {
    console.error("Missing TELEGRAM_BOT_TOKEN or Upstash Redis credentials");
    return NextResponse.json({ error: "Сервис временно недоступен" }, { status: 500 });
  }

  const text = [
    "🔧 Новая заявка с сайта МастерСервис",
    "",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Проблема: ${message || "—"}`,
  ].join("\n");

  try {
    const { sent, total } = await broadcastMessage(text);

    if (total === 0) {
      console.error("No Telegram subscribers yet");
      return NextResponse.json(
        { error: "Нет подписчиков. Напишите боту /start." },
        { status: 500 },
      );
    }

    if (sent === 0) {
      return NextResponse.json({ error: "Не удалось отправить заявку" }, { status: 500 });
    }
  } catch (err) {
    console.error("Telegram broadcast failed", err);
    return NextResponse.json({ error: "Не удалось отправить заявку" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
