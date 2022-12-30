Ready to be a winner?
You'll need to prove your smart contract skills to us. Don't worry, you totally got this!

Your Goal: Emit the Winner event
Your goal is simple! Emit the winner event on this smart contract on the Goerli testnet: https://goerli.etherscan.io/address/0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502#code

If you take a look at the Code tab in Etherscan, you'll see that the source code for this contract looks like this:

// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
contract Contract {
event Winner(address);

    function attempt() external {
        require(msg.sender != tx.origin, "msg.sender is equal to tx.origin");
        emit Winner(msg.sender);
    }

}

How do we possibly make it so the tx.origin (the EOA who originated the transaction) is not equal to the msg.sender?

We'll leave that challenge up to you!

My solution :
We have two smart contracts, callTheCallingContract and callAtempt. I then deployed them both, and by calling the callTheCallingContract's function named callTheCaller with the callAtempt's contract address, it calls the callAtempt's contract attemptCall function that calls the final smart contract provided by the Alchemy Team. I called the first sc by verifying it on Goerli Etherscan and using their ui.

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
