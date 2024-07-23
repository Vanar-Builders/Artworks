// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const ArtworkNFT721 = await ethers.deployContract("contracts/ArtworkERC721NFT.sol:ArtworkERC721NFT");
  const artworkNFT721 = await ArtworkNFT721.waitForDeployment();
  console.log("Deploying Contract...")
  console.log("Contract deployed to address:",  await artworkNFT721.getAddress());

  const NftMarketplace = await ethers.deployContract("contracts/NftMarketplace.sol:NftMarketplace");
  const nftMarketplace = await NftMarketplace.waitForDeployment();
  console.log("Deploying Contract...")
  console.log("Contract deployed to address:",  await nftMarketplace.getAddress());


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
