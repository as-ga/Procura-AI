import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Database configuration
  REDIS_URL: z.string().url(),
  CLIENT_URL: z.string().url(),

  // OpenAI API configuration
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_BASE_URL: z.string().url().optional(),
  OPENAI_MODEL: z.string().min(1).optional(),

  // Prava API configuration
  PRAVA_SECRET_KEY: z.string().min(1),
  PRAVA_PUBLISHABLE_KEY: z.string().min(1),
  PRAVA_BASE_URL: z.string().url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.format());

  process.exit(1);
}

export const env = Object.freeze({
  ...parsed.data,
  isDev: parsed.data.NODE_ENV === "development",
});
