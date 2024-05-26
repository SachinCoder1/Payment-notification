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
import { initializeSocket, io as socketIO } from "./service/socket";
import { createServer } from "http";
const app = express();

CONNECT_MONGO_DB();

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req: any, res: any, next: any) {
  req.socketio = socketIO;
  next();
});

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.use(`${DEFAULT_API_URL}/auth`, routes.auth);

app.all("*", (req, res) => {
  res.status(404).send(`Accessing Invalid route ${req.originalUrl} `);
});

const init = async () => {
  try {
    httpServer.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
    console.log("Error while starting server");
  }
};

/**
 * Staring the app
 */
init();
