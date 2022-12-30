const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");

app.use(cors());
app.use(express.json());

//ex balances
const publicKeys = {
    "043b17313f13475d7e5c004a54c838fb36a52938a932e4423a636e1f021a3e0bc2b69b0b6a0ecc00e9dac1b31bd489dc8db236b835f2deda40440d96d353087b03": {
        balance: 100,
        nonce: 0,
    },
    //8bfa83f08a610458efc3e4e8f90d58bd6cc5b456eef41501fd0ef2109dc46860
    "04d495e87614405bf2192d9a0541f911c974ad1609968ea236428cf825e166096c6f8218f7ad48d149acd16721bfc4df5ea9b2d1d2a4a128cdef1df96589ab08a3": {
        balance: 75,
        nonce: 0,
    },
    //cf07b4c54f14dc13056f8aa82767ab7f31dc3fbabd497108cf8c8641c1afe977
    "0461778a63d2ed7c4e7e0fc3380af7837570f748444b69eb09e80738a14bf2cb7b6f2777cf3bb3cc359737966367a8c6efe365ca071d7c049d8ee3b2ce74cf31f9": {
        balance: 50,
        nonce: 0,
    },
    //2df0d99d1866ba3c0881e81b30ef905769a9774247ffede1139fa56779d4a8cd
};

app.get("/publicKeys/:address/balance", (req, res) => {
    const { address } = req.params;
    const balance = publicKeys[address].balance || 0;
    res.send({ balance });
});


app.post("/send", async(req, res) => {
    const { sender, sign, recipient, amount } = req.body;

    setInitialBalance(sender);
    setInitialBalance(recipient);

    var nonceHash = await secp.utils.sha256(publicKeys[sender].nonce.toString());
    if (!secp.verify(sign, nonceHash, sender)) {
        res.status(400).send({ message: "Not enough permissions !" });
    } else if (publicKeys[sender].balance < amount) {
        res.status(400).send({ message: "Not enough funds !" });
    } else {
        publicKeys[sender].balance -= amount;
        publicKeys[recipient].balance += amount;
        publicKeys[sender].nonce++;
        res.send({ balance: publicKeys[sender].balance });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!publicKeys[address].balance) {
        publicKeys[address].balance = 0;
    }
}