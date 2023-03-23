const { ethers, upgrades } = require("hardhat");

const proxyAddress = "0x1a1591E11b0336A8004968AeBF2c90884D0a7E39";

async function main() {
  const VendingMachineV2 = await ethers.getContractFactory("VendingMachineV2");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV2);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );

  console.log("The current contract owner is: ", await upgraded.owner());
  console.log("Implementation contract address: ", implementationAddress);
}

main();
