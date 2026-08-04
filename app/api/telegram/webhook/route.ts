import { NextResponse } from "next/server";
import { processTelegramUpdate } from "@/lib/telegram/bot";
import { hasSubscriberStore } from "@/lib/telegram/subscribers";

export async function POST(request: Request) {
  if (!hasSubscriberStore() || !process.env.TELEGRAM_BOT_TOKEN?.trim()) {
    return NextResponse.json({ ok: true });
  }

  try {
    const update = await request.json();
    await processTelegramUpdate(update);
  } catch (err) {
    console.error("Telegram webhook error", err);
  }

  return NextResponse.json({ ok: true });
}
