import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ publicKey, setPublicKey, signature, setSignature, balance, setBalance }) {
  async function signatureOnChange(evt){
    const signature = evt.target.value;
    setSignature(signature);
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
        Signature
        <input placeholder="Type in your signature" value={signature} onChange={signatureOnChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
