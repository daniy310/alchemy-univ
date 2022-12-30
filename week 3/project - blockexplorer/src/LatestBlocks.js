import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

let blocksArray = [];

function LatestBlocks() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    async function getBlock() {
      setBlock(await alchemy.core.getBlock(blockNumber));
    }

    getBlockNumber();
    console.log(blockNumber);
    getBlock();
    console.log(block);

    async function getBlocksArray() {
      for (let i = blockNumber; i > blockNumber - 10; i--)
        blocksArray.push(await alchemy.core.getBlock(i));
    }

    getBlocksArray();
    console.log(blocksArray);
  }, []);

  return (
    <div>
      <h1>salut!</h1>
      <ul>
        {blocksArray.map((block) => (
          <li>{block.hash}</li>
        ))}
      </ul>
    </div>
  );
}

export default LatestBlocks;
