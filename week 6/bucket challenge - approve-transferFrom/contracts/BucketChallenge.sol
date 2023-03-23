// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface Bucket {
    function drop(address, uint) external;
}

contract BucketChallenge {
    address bucketAddress = 0x873289a1aD6Cf024B927bd13bd183B264d274c68;
    address DaniesAddress = 0x5F24f4943D3Fb1A7e729528fA2310cdB4ac0d55c;

    ERC20 DaniesContract = ERC20(DaniesAddress);

    function approveSpending() external {
        DaniesContract.approve(bucketAddress, 5 * (10 ** 18));
    }

    function spend() external {
        Bucket(bucketAddress).drop(DaniesAddress, 1);
    }
}
