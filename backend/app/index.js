require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const cors = require("cors");
const router = express.Router();

const message = require("../utils/message");
const utils = require("../utils/utils");

const myToken = process.env.TOKEN;

/* MIDDLEWARE */
app.use(cors({ origin: ["https://ethereum-verification-address.netlify.app/"] }));
app.use(express.json());

app.use("/", router); // path must route to lambda
app.use("/.netlify/functions/index", router); // path must route to lambda

router.post(`/verify-address`, function (req, res) {
  const { ethAddress, token } = { ...req.body };
  if (token === myToken)
    utils.isValidAddress(ethAddress).then((data) => res.json(data).status(200));
  else {
    const data = { res: "KO", msg: message.ERROR_TOKEN, ethAddress };
    res.json(data).status(200);
  }
});

router.get("/healtcheck", (req, res) => {
  res.sendStatus(200);
});

module.exports = app;

module.exports.handler = serverless(app);
