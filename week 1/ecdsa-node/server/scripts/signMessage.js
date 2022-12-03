const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const prompt = require("prompt-sync")();

const privateKey = prompt("Enter your private key : ");
const nonce = prompt("Enter the tx nonce : ");

(async() => {
    const nonceHash = await secp.utils.sha256(nonce);

    const signature = await secp.sign(nonceHash, privateKey);

    console.log("Your signature is : " + toHex(signature));
    console.log(toHex(nonceHash));
})();


/*
30450221008c0e20454316749e398734e5b99afc0d8b52380934968dcce08ce32969782853022054485017849ac2c1f27607a5b14098d8f04cb7fd9ca69c9ed7292dd1c04462fa
3045022100f7505437212754789c141458ed71fdf642829886c6efba3b8e54f630d7bccd160220375bea5bf5387c8f4aabefb01ff37eddedf98ce52cbb7b3345d6b930c17ccd4f

5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9
5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9



*/