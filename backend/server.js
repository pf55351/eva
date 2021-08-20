require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
var moment = require('moment')();

const message= require('./message');
const utils = require('./utils');


const port = process.env.PORT;
const myToken=process.env.TOKEN;

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(function(req, res, next){
  const ip = req.ip.split(':').pop();
  console.log(`${moment.format('yyyy-MM-DD HH:mm:ss')} - IP: ${ip}`);
  console.log(`${moment.format('yyyy-MM-DD HH:mm:ss')} - BODY: `, req.body)
  /* CHECK IP DISABLE */
  // if(utils.checkValidIp(ip)) next();
  // else
  // res.json({res:'KO',msg:message.ERROR_IP})
  next();

})  

 

app.post("/api/v1/verifyAddress", function(req,res){
     const {ethAddress,token}={...req.body}
     if(token===myToken)
     utils.isValidAddress(ethAddress).then(data=> res.json(data).status(200));
     else{
      const data={res:'KO',msg:message.ERROR_TOKEN,ethAddress}
      res.json(data).status(200)
     }
     
});

app.all('*', function (req, res) {
    
    res.send(`<h1 style="text-align:center">HELLO! YOUR ADDRESS IS ${req.ip.split(':').pop()}!</h1> <br>${message.GENERAL_MESSAGE}`)
  });


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

