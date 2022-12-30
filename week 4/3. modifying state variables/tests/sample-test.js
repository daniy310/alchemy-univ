//import testing libraries : https://www.chaijs.com/guide/styles/
const { expect, assert } = require("chai");

// the `describe` scope encapsulates an entire test called `TestModifyVariable`
// the `it` says the behavior that should be expected from the test
describe("TestModifyVariable", function () {
  it("should change x to 1337", async function () {
    // this line creates an ethers ContractFactory abstraction: https://docs.ethers.org/v5/api/contract/contract-factory/
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    // we then use the ContractFactory obj to deploy an instance of the contract
    const contract = await ModifyVariable.deploy(10, "abcd");

    //wait for contract to be deployed and validated!
    await contract.deployed();

    //modify x from 10 to 1337 via this function
    await contract.modifyToLeet();
    //getter for state var x
    const newX = await contract.x();
    const newEy = await contract.ey();
    assert.equal(newX.toNumber(), 1337);
  });

  it("should change ey to legea", async function () {
    // this line creates an ethers ContractFactory abstraction: https://docs.ethers.org/v5/api/contract/contract-factory/
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    // we then use the ContractFactory obj to deploy an instance of the contract
    const contract = await ModifyVariable.deploy(10, "abcd");

    //wait for contract to be deployed and validated!
    await contract.deployed();

    //modify x and ey
    await contract.modifyToLeet();
    //getter for state var ey
    const newEy = await contract.ey();
    assert.equal(newEy.toString(), "legea");
  });
});
