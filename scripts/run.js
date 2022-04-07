const main = async () => {
    const [owner, randomP] = await hre.ethers.getSigners();

    const wavePortalContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const wavePortalContract = await wavePortalContractFactory.deploy();
    await wavePortalContract.deployed();

    console.log("Contract deployed to:", wavePortalContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await wavePortalContract.getTotalWaves();
    console.log("Wave count:", waveCount);

    let waveTxn = await wavePortalContract.wave("imgUrl", "caption");
    await waveTxn.wait();
    waveCount = await wavePortalContract.getTotalWaves();
    console.log("Wave count:", waveCount);
    let waves = await wavePortalContract.getAllWaves();
    console.log("Waves:", waves);

    waveTxn = await wavePortalContract.wave("2nd imgUrl", "2nd caption");
    await waveTxn.wait();
    waveCount = await wavePortalContract.getTotalWaves();
    console.log("Wave count:", waveCount);
    waves = await wavePortalContract.getAllWaves();
    console.log("Waves:", waves);
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