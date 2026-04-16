import "./types/express-augment";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/api-router";
const app = express();
import {
  inputErrorHandler,
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} from "./errors";

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to the API!" });
});

app.use("/api", apiRouter);
app.use("/api/*splat", inputErrorHandler);
app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

export default app;
