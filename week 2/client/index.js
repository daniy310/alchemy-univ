const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const prompt = require("prompt-sync")();

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList);

async function main() {
    // TODO: how do we prove to the server we're on the nice list? 

    const name = prompt("Enter your name : ");
    const index = niceList.findIndex(n => n === name);
    const merkleProof = merkleTree.getProof(index);

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        // TODO: add request body parameters here!
        name: name,
        proof: merkleProof,
    });

    console.log({ gift });
}

main();