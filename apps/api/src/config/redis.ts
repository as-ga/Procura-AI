import { createClient } from "redis";

import { env } from "./env";

export const redis = createClient({ url: env.REDIS_URL });

redis.on("error", (e) => console.error("❌ Redis Error:", e));

export async function connectRedis() {
  if (redis.isOpen) return;
  await redis.connect();
  console.log("✅ Redis Connected");
}
