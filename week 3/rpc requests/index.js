const { Network, Alchemy } = require("alchemy-sdk");

const settings = {
    apiKey: "8lJhdFzHVvs4vFhIihXkdpWCUZ_cVP0T", // Replace with your Alchemy API Key.
    network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(settings);

async function main() {
    const latestBlock = await alchemy.core.getBlockNumber();
    console.log("The latest block is : " + latestBlock);
}

main();

// const axios = require('axios');
// const ALCHEMY_URL = "https://eth-goerli.g.alchemy.com/v2/8lJhdFzHVvs4vFhIihXkdpWCUZ_cVP0T";

// axios.post(ALCHEMY_URL, {
//     jsonrpc: 2.0,
//     id: 1,
//     method: "eth_getBlockByNumber",
//     params: [
//         "0xb443", //block-ul 0xb443
//         true // retrive the full tx obj in transactions array
//     ]
// }).then((response) => {
//     console.log(response.data.result);
// });