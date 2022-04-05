// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint totalWaves;
    mapping (address => uint) addressToWaves;

    constructor() {
        console.log("Yo yo yo, I am a contract and I am smart");
    }

    function wave() public {
        totalWaves += 1;
        addressToWaves[msg.sender] += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint) {
        console.log("We have %d total wave%s!", totalWaves, (totalWaves != 1? "s":""));
        return totalWaves;
    }

    function getAddressWaves(address _address) public view returns (uint) {
        console.log("%s has waved at us %d time%s", _address, addressToWaves[_address], (addressToWaves[_address] != 1? "s":""));
        return addressToWaves[_address];
    }
}