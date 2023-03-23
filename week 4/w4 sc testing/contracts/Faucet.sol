// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract Faucet {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function withdraw(uint _amount) public payable {
        //users can withdraw <= 0.1 eth
        require(_amount <= 100000000000000000);
        require(address(this).balance >= _amount, "Insufficient funds");
        (bool sent, ) = payable(msg.sender).call{value: _amount}("");
        require(sent, "Failed to send ETH");
    }

    function withdrawAll() public onlyOwner {
        (bool sent, ) = owner.call{value: address(this).balance}("");
        require(sent, "Failed to send ETH");
    }

    function destroyFaucet() public onlyOwner {
        selfdestruct(owner);
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "The caller isn't the owner of the contract"
        );
        _;
    }
}
