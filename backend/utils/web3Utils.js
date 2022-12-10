const web3 = require("web3");
var cache = require("memory-cache");

const isValidEthAddress = async (ethAddress) => {
    try {
    if (!ethAddress && typeof ethAddress !== "string") {
      return false;
    }
    let result;
   // result = cache.get(ethAddress);
    if (!result) {
      result =
        web3.utils.isAddress(ethAddress) &&
        web3.utils.toChecksumAddress(ethAddress) !== undefined;
      cache.put(ethAddress, result, 3600);
    }
    return result;
  } catch (_err) {
    console.err(_err);
    return false;
  }
};

module.exports = { isValidEthAddress };
