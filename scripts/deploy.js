const hre = require("hardhat");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

async function main() {
  // Get the deployer's signer
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy ArtworksRegistry contract
  const ArtworksRegistry = await ethers.deployContract("ArtworksRegistry");
  const artworksRegistry = await ArtworksRegistry.waitForDeployment();
  console.log("Deploying ArtworksRegistry contract...");

  //const artworksRegistry = await ArtworksRegistry.deploy(pass-arguments)

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

// Execute the main function
main()
  .then(() => process.exit(0)) // Exit with success status
  .catch((error) => {
    // Log error and exit with failure status
    console.error(error);
    process.exit(1);
  });
