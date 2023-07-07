const hre = require('hardhat');

async function main() {
  const RegistrationContract = await hre.ethers.getContractFactory(
    'RegistrationContract'
  );
  const registrationContract = await RegistrationContract.deploy();

  await registrationContract.deployed();

  console.log(
    'RegistrationContract deployed to:',
    registrationContract.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
