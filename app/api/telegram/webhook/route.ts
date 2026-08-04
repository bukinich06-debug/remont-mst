import { NextResponse } from "next/server";
import { processTelegramUpdate } from "@/lib/telegram/bot";

export async function POST(request: Request) {
  try {
    const update = await request.json();
    await processTelegramUpdate(update);
  } catch (err) {
    console.error("Telegram webhook error", err);
  }
  // Always 200 so Telegram does not retry endlessly on bad payloads
  return NextResponse.json({ ok: true });
}
