const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const DA2_ADDRESS = "0x5F24f4943D3Fb1A7e729528fA2310cdB4ac0d55c";
  const DA2_ABI = require("../artifacts/contracts/Danies2.sol/Danies2.json");

  const provider = ethers.getDefaultProvider("goerli");
  const DA2 = new ethers.Contract(DA2_ADDRESS, DA2_ABI, provider);

  const addresses = [
    "0x4a8af4ec4718ECCB0FD70f384f74A8e082706603",
    "0x45f5d246BCDa1B0fCCaEfFD9d263a4148EE3ac98",
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  ];

  // addresses.forEach(address => {
  await DA2.connect(deployer).transfer(addresses[0], 10 * 10 ** 18);
  // })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
