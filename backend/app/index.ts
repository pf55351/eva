import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import serverless from "serverless-http";
import message from "../utils/message";
import { isValidEthAddress } from "../utils/web3Utils";
import cors from "cors";

dotenv.config();
const myToken:unknown= process.env.TOKEN;
const app: Express = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

app.post(`/verify-address`, async function (req: Request, res: Response) {
  const token = req.headers["x-api-key"];
  const { ethAddress = "" } = { ...req.body };
  if (token === myToken) {
    const data = (await isValidEthAddress(ethAddress))
      ? { res: "OK", msg: message.SUCCESS_MESSAGE, ethAddress }
      : { res: "KO", msg: message.ERROR_MESSAGE, ethAddress };
    res.json(data).status(200);
  } else {
    const data = { res: "KO", msg: message.ERROR_TOKEN, ethAddress };
    res.json(data).status(200);
  }
});

export default app;