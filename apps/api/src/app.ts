import express, { Application, Response } from "express";

const app: Application = express();

app.use(express.json());

app.get("/", (_, res: Response) => res.json({ message: "Procura AI APIs" }));

export default app;
