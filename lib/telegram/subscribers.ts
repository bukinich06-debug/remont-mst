const SUBSCRIBERS_KEY = "telegram:subscribers";

function getRedisConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

async function redisCommand(command: string[]): Promise<unknown> {
  const config = getRedisConfig();
  if (!config) {
    throw new Error("Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN");
  }

  const res = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  const data = (await res.json()) as { result?: unknown; error?: string };

  if (!res.ok || data.error) {
    throw new Error(data.error || `Redis error ${res.status}`);
  }

  return data.result;
}

export function hasSubscriberStore(): boolean {
  return getRedisConfig() !== null;
}

export async function getSubscribers(): Promise<string[]> {
  const result = await redisCommand(["SMEMBERS", SUBSCRIBERS_KEY]);
  if (!Array.isArray(result)) return [];
  return result.map(String).filter(Boolean);
}

export async function addSubscriber(chatId: string | number): Promise<void> {
  await redisCommand(["SADD", SUBSCRIBERS_KEY, String(chatId)]);
}

export async function removeSubscriber(chatId: string | number): Promise<void> {
  await redisCommand(["SREM", SUBSCRIBERS_KEY, String(chatId)]);
}
