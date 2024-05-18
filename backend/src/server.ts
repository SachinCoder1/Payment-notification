require("module-alias/register");
import express from "express";
import compression from "compression";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
dotenv.config();

import CONNECT_MONGO_DB from "~/db";
import { CLIENT_URL, DEFAULT_API_URL } from "~/config";
import { PORT } from "./constants";
import routes from "./routes";

const app = express();

CONNECT_MONGO_DB();

app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(
  cors({
    origin: [CLIENT_URL],
  })
);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.use(`${DEFAULT_API_URL}/auth`, routes.auth);

app.all("*", (req, res) => {
  res.status(404).send(`Accessing Invalid route ${req.originalUrl} `);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
