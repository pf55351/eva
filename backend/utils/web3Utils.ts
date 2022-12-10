import web3 from "web3";
import cache from "memory-cache";

const isValidEthAddress = async (ethAddress: string) => {
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
    console.error(_err);
    return false;
  }
};

export { isValidEthAddress };
