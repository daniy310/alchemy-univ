const { ethers, utils } = require("hardhat");
const { FormatTypes, Interface } = require("@ethersproject/abi");

async function main() {
  const governor = ethers.getContractAt(
    "MyGovernor",
    "0x7d2a30c0601b274e6fd5E3dBE35adA45482e02E4"
  );
  const token = ethers.getContractAt(
    "MyToken",
    "0xb8cdaE7A74f0c09a28E41eCb2Fd6ee1331B12AD6"
  );

  //   const tokenIFace = new Interface("../artifacts/MyToken.sol/MyToken.json");
  const tokenIFace = new Interface(["function mint(address adr, uint sum)"]);

  const owner = new ethers.Wallet(
    process.env.GOERLI_PRIVATE_KEY,
    ethers.getDefaultProvider()
  );

  const tx = await governor.propose(
    [token.address],
    [0],
    [
      await tokenIFace.encodeFunctionData("mint", [
        owner.address,
        ethers.utils.parseEther("2500"),
      ]),
    ],
    "Give the owner some more tokens :P"
  );

  const receipt = await tx.wait();
  const event = receipt.event.find((x) => x.event === "ProposalCreated");
  const { proposalId } = event.args;
  console.log("Your proposal has ID : ", proposalId);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
