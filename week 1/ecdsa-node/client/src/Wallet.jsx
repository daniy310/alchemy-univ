import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ publicKey, setPublicKey, privateKey, setPrivateKey, balance, setBalance }) {
  async function privateKeyOnChange(evt){
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
  }

  async function onChange(evt) {
    const publicKey = evt.target.value;
    setPublicKey(publicKey);
    if (publicKey) {
      const {
        data: { balance },
      } = await server.get(`publicKeys/${publicKey}/balance`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Public Key
        <input placeholder="Type in a public key" value={publicKey} onChange={onChange}></input>
      </label>

      <label>
        Private Key
        <input placeholder="Type in a private key" value={privateKey} onChange={privateKeyOnChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
