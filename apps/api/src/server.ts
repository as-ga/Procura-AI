import app from "@/app";
import { connectRedis, env } from "@/config";

async function bootstrap() {
  await connectRedis();

  app.listen(env.PORT, () =>
    console.log(`🚀 Server running on http://localhost:${env.PORT}`)
  );
}

bootstrap();
