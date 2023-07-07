const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('RegistrationContract', function () {
  let registrationContract;
  let owner;

  beforeEach(async function () {
    const RegistrationContract = await ethers.getContractFactory(
      'RegistrationContract'
    );
    registrationContract = await RegistrationContract.deploy();

    // Wait for the contract deployment to be mined
    await registrationContract.deployed();

    [owner] = await ethers.getSigners();
  });

  it('should register an entity', async function () {
    const tinNumber = 123456789;
    const contact = 'John Doe';
    const physicalAddress = '123 Main St';
    const countryOfOrigin = 'USA';

    await registrationContract
      .connect(owner)
      .register(tinNumber, contact, physicalAddress, countryOfOrigin);

    const entity = await registrationContract.getEntity(owner.address);

    expect(entity.tinNumber).to.equal(tinNumber);
    expect(entity.contact).to.equal(contact);
    expect(entity.physicalAddress).to.equal(physicalAddress);
    expect(entity.countryOfOrigin).to.equal(countryOfOrigin);
    expect(entity.verified).to.equal(false);
  });

  it('should verify TIN number', async function () {
    const tinNumber = 123456789;
    const contact = 'John Doe';
    const physicalAddress = '123 Main St';
    const countryOfOrigin = 'USA';

    await registrationContract
      .connect(owner)
      .register(tinNumber, contact, physicalAddress, countryOfOrigin);
    await registrationContract.connect(owner).verifyTIN();

    const entity = await registrationContract.getEntity(owner.address);

    expect(entity.verified).to.equal(true);
  });
});
