import express, { Application, Response } from "express";
import cors from "cors";
import { env } from "@/config";

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));

// ==================== Log ===============================
if (env.isDev) {
  app.use((req, res, next) => {
    console.table({
      req: {
        method: req.method,
        url: `${req.protocol}://${req.hostname}:${env.PORT}${req.url}`,
        statusCode: res.statusCode,
      },
    });
    next();
  });
}

// ================== Root Route =========================
app.get("/", (_, res: Response) =>
  res.json({ message: "Wellcome to Procura AI APIs" })
);

// ==================== Health Check  ===============================
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ==================== Feature Route ===============================
import routes from "@/index.routes";
app.use("/api", routes);

export default app;
