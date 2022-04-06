// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    
    struct Wave {
        address Waver;
        string imgUrl;
        string caption;
        uint256 timestamp;
    }

    event NewWave(address indexed from, string imgUrl, string caption, uint256 timestamp);

    uint totalWaves;
    Wave[] waves;
    
    constructor() {
        console.log("Yo yo yo, I am a contract and I am smart");
    }

    function wave(string memory _imgUrl, string memory _caption) public {
        totalWaves += 1;
        waves.push(Wave(msg.sender, _imgUrl, _caption, block.timestamp));
        emit NewWave(msg.sender, _imgUrl, _caption, block.timestamp);
        console.log("%s has waved! with img %s and caption %s", msg.sender, _imgUrl, _caption);
    }

    function getTotalWaves() public view returns (uint) {
        console.log("We have %d total wave%s!", totalWaves, (totalWaves != 1? "s":""));
        return totalWaves;
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
}