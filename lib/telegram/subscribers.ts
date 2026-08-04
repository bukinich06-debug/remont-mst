import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "telegram-subscribers.json");

async function ensureStore(): Promise<string[]> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string" && id.length > 0);
  } catch {
    return [];
  }
}

async function save(ids: string[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const unique = [...new Set(ids)];
  await writeFile(STORE_PATH, JSON.stringify(unique, null, 2), "utf8");
}

export async function getSubscribers(): Promise<string[]> {
  return ensureStore();
}

export async function addSubscriber(chatId: string | number): Promise<void> {
  const id = String(chatId);
  const current = await ensureStore();
  if (current.includes(id)) return;
  await save([...current, id]);
}

export async function removeSubscriber(chatId: string | number): Promise<void> {
  const id = String(chatId);
  const current = await ensureStore();
  await save(current.filter((x) => x !== id));
}
