// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RegistrationContract {
    struct Entity {
        uint256 tinNumber;
        string contact;
        string physicalAddress;
        string countryOfOrigin;
        bool verified;
    }

    mapping(address => Entity) public entities;
    address[] public registeredAddresses;

    constructor() {}

    modifier onlyNotRegistered() {
        require(
            entities[msg.sender].tinNumber == 0,
            "Address is already registered."
        );
        _;
    }

    function register(
        uint256 _tinNumber,
        string memory _contact,
        string memory _physicalAddress,
        string memory _countryOfOrigin
    ) public onlyNotRegistered {
        entities[msg.sender] = Entity(
            _tinNumber,
            _contact,
            _physicalAddress,
            _countryOfOrigin,
            false
        );
        registeredAddresses.push(msg.sender);
    }

    function verifyTIN() public {
        require(
            entities[msg.sender].tinNumber != 0,
            "Address is not registered."
        );

        // Perform your verification logic here
        // For simplicity, we set the verification status to true
        entities[msg.sender].verified = true;
    }

    function getEntity(
        address _address
    )
        public
        view
        returns (
            uint256 tinNumber,
            string memory contact,
            string memory physicalAddress,
            string memory countryOfOrigin,
            bool verified
        )
    {
        Entity storage entity = entities[_address];
        return (
            entity.tinNumber,
            entity.contact,
            entity.physicalAddress,
            entity.countryOfOrigin,
            entity.verified
        );
    }

    function getRegisteredAddresses() public view returns (address[] memory) {
        return registeredAddresses;
    }
}
