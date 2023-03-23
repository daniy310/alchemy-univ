const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Faucet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    let oneEther = ethers.utils.parseUnits("1", "ether");
    let withdrawAmount = ethers.utils.parseUnits("1", "ether");

    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy({ value: oneEther });

    const [owner, signer2] = await ethers.getSigners();

    console.log("Signer 1 address: ", owner.address);
    return { faucet, owner, withdrawAmount, signer2 };
  }

  it("should deploy and set the owner correctly", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("should not allow withdrawals above .1 ETH at a time", async function () {
    const { faucet, withdrawAmount } = await loadFixture(
      deployContractAndSetVariables
    );
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  it("only the owner should be able to call withdrawAll", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);

    await expect(faucet.withdrawAll()).to.not.be.reverted;
  });

  it("signer2 shouldn't be able to call withdrawAll", async function () {
    const { faucet, signer2 } = await loadFixture(
      deployContractAndSetVariables
    );

    await expect(faucet.connect(signer2).withdrawAll()).to.be.reverted;
  });

  it("only the owner should be able to call destroyFaucet", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);

    await expect(faucet.destroyFaucet()).to.not.be.reverted;
  });

  it("signer2 shouldn't be able to call destroyFaucet", async function () {
    const { faucet, signer2 } = await loadFixture(
      deployContractAndSetVariables
    );

    await expect(faucet.connect(signer2).destroyFaucet()).to.be.reverted;
  });

  it("destroyFaucet() should destroy the contract", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);

    await faucet.destroyFaucet();
    expect(await ethers.provider.getCode(faucet.address)).to.hexEqual("0x");
  });

  it("withdrawAll() should empty the contract", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);

    await faucet.withdrawAll();
    expect(await ethers.provider.getBalance(faucet.address)).to.equal("0");
  });
});
