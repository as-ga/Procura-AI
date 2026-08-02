import express, { Application, Response } from "express";

const app: Application = express();

app.use(express.json());

app.get("/", (_, res: Response) =>
  res.json({ message: "Wellcome to Procura AI APIs" })
);

// ==================== Health Check  ===============================
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ==================== Feature Route ===============================
import routes from "@/index.routes";
app.use("/api", routes);

export default app;
