const hre = require("hardhat");

async function main() {
    const Upload = await hre.ethers.getContractFactory("Upload");
    const upload = await Upload.deploy();

    console.log("Library deployed to: ", await upload.getAddress());
}

main().catch(console.error);