const main = async () => {
    const [owner, randomP] = await hre.ethers.getSigners();

    const wavePortalContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const wavePortalContract = await wavePortalContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await wavePortalContract.deployed();

    console.log("Contract deployed to:", wavePortalContract.address);
    console.log("Contract deployed by:", owner.address);

    let contractBalance = await hre.ethers.provider.getBalance(
        wavePortalContract.address
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    const waveTxn = await wavePortalContract.wave("imgUrl1", "caption1");
    await waveTxn.wait();

    const waveTxn2 = await wavePortalContract.wave("imgUrl2", "caption2");
    await waveTxn2.wait();

    contractBalance = await hre.ethers.provider.getBalance(wavePortalContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await wavePortalContract.getAllWaves();
    console.log(allWaves);
};
  
const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

runMain();