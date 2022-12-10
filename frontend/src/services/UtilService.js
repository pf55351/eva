import axios from "axios";

const serverUrl = process.env.REACT_APP_API_URL;
const serverPort = process.env.REACT_APP_API_PORT;
const serverContext = process.env.REACT_APP_API_CONTEXT;
const apiToken = process.env.REACT_APP_TOKEN;

const serverPath = `${serverUrl}${serverPort ? `:${serverPort}` : ""}${
  serverContext ? serverContext : ""
}`;

let config = {
  headers: {
    "X-API-KEY": apiToken,
  },
};

const verifyAddressService = async (data) => {
  const endPoint = process.env.REACT_APP_IS_VALID_ADDRESS_SERVICE;
  const result = await axios.post(`${serverPath}${endPoint}`, data, config);
  return result.data;
};

export { verifyAddressService };
