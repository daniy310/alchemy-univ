const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
// const { ethers } = require("hardhat");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    const signer = ethers.provider.getSigner(0);
    const oneEther = ethers.utils.parseUnits("1", "ether");
    let counter = 0;
    let ok = false;

    while (!ok) {
      try {
        counter++;
        const wallet = ethers.Wallet.createRandom().connect(ethers.provider);

        //we need some funds for a tx
        await signer.sendTransaction({
          to: wallet.address,
          value: oneEther,
        });

        await game.connect(wallet).win();

        console.log(`The winning address is ${wallet.address}`);
        console.log(`We only needed ${counter} tries :)`);
        ok = true;
      } catch (err) {}
    }

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
