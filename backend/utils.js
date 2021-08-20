const web3 = require('web3')
const message= require('./message');


const checkValidIp = visitor_ip => {
    const whiteList = process.env.WHITE_LIST;
    const arrList = whiteList.split('@@')
    return arrList.find(ip=>ip===visitor_ip)
}


const isValidAddress = async ethAddress => {
    console.log(ethAddress)
    console.log(web3.utils.toChecksumAddress(ethAddress));
 return    web3.utils.isAddress(ethAddress) && web3.utils.toChecksumAddress(ethAddress)!==undefined? {res:'OK',msg:message.SUCCESS_MESSAGE,ethAddress}:{res:'KO',msg:message.ERROR_MESSAGE,ethAddress}
}
 

module.exports={isValidAddress,checkValidIp}