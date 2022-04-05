const main = async () => {
    const [owner, randomP] = await hre.ethers.getSigners();

    const wavePortalContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const wavePortalContract = await wavePortalContractFactory.deploy();
    await wavePortalContract.deployed();

    console.log("Contract deployed to:", wavePortalContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await wavePortalContract.getTotalWaves();

    let waveTxn = await wavePortalContract.wave();
    await waveTxn.wait();

    waveCount = await wavePortalContract.getTotalWaves();
    randomPWaveCount = await wavePortalContract.connect(randomP).getAddressWaves(randomP.address);

    waveTxn = await wavePortalContract.connect(randomP).wave();
    await waveTxn.wait();

    waveCount = await wavePortalContract.getTotalWaves();
    randomPWaveCount = await wavePortalContract.connect(randomP).getAddressWaves(randomP.address);

    waveTxn = await wavePortalContract.connect(randomP).wave();
    await waveTxn.wait();

    waveCount = await wavePortalContract.getTotalWaves();
    randomPWaveCount = await wavePortalContract.connect(randomP).getAddressWaves(randomP.address);
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