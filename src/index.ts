import env from "./env";

import { connect } from "mongoose";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import userRouter from "./routers/user.router";
import receiptRouter from "./routers/receipt.router"

async function startDb() {
  console.info(`connecting to database at ${env.DB_CONNECTION_STRING}`);

  await connect(env.DB_CONNECTION_STRING);
}

const corsOptions = {
  credentials: true,
  origin: env.ALLOWED_ORIGINS,
};

async function main() {
  await startDb();

  const app = express();

  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(helmet());

  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/receipts", receiptRouter);

  app.listen(env.PORT, () => {
    console.log(
      `api listening on http://localhost:${env.PORT}/api/v1/ in ${env.NODE_ENV} mode`
    );
    console.log(`allowed origins: ${env.ALLOWED_ORIGINS.join(", ")}`);
  });
}
main();