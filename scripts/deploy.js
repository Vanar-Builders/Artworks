const hre = require("hardhat");

async function main() {
  // Deploy ArtworksRegistry contract
  const ArtworksRegistry = await ethers.deployContract("ArtworksRegistry");
  const artworksRegistry = await ArtworksRegistry.waitForDeployment();
  console.log("Deploying ArtworksRegistry contract...");
  console.log(
    "ArtworksRegistry deployed to address:",
    await artworksRegistry.getAddress()
  );

  // Deploy NFTMarketplace contract with the address of ArtworksRegistry
  const NftMarketplace = await ethers.deployContract("NftMarketplace", [
    await artworksRegistry.getAddress(),
  ]);
  const nftMarketplace = await NftMarketplace.waitForDeployment();
  console.log("Deploying NFTMarketplace contract...");
  console.log(
    "NFTMarketplace deployed to address:",
    await nftMarketplace.getAddress()
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
