require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const cors = require("cors");
const router = express.Router();

const message = require("../utils/message");
const utils = require("../utils/web3Utils");

const myToken = process.env.TOKEN;

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

app.use("/.netlify/functions/index", router); // path must route to lambda

router.post(`/verify-address`, async function (req, res) {
  const token = req.headers["x-api-key"];
  const { ethAddress } = { ...req.body };
  if (token === myToken) {
    const data = (await utils.isValidEthAddress(ethAddress))
      ? { res: "OK", msg: message.SUCCESS_MESSAGE, ethAddress }
      : { res: "KO", msg: message.ERROR_MESSAGE, ethAddress };
    res.json(data).status(200);
  } else {
    const data = { res: "KO", msg: message.ERROR_TOKEN, ethAddress };
    res.json(data).status(200);
  }
});

router.get("/healtcheck", (req, res) => {
  res.sendStatus(200);
});

module.exports = app;

module.exports.handler = serverless(app);
