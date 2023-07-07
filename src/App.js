import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import RegistrationForm from './RegistrationForm';
import { ethers } from 'ethers';

const RegistrationContractAddress = 0x5fbdb2315678afecb367f032d93f642f64180aa3;
const RegistrationContractABI = [
  // Contract ABI here
  // ...
  [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'entities',
      outputs: [
        {
          internalType: 'uint256',
          name: 'tinNumber',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'contact',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'physicalAddress',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'countryOfOrigin',
          type: 'string',
        },
        {
          internalType: 'bool',
          name: 'verified',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_address',
          type: 'address',
        },
      ],
      name: 'getEntity',
      outputs: [
        {
          internalType: 'uint256',
          name: 'tinNumber',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'contact',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'physicalAddress',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'countryOfOrigin',
          type: 'string',
        },
        {
          internalType: 'bool',
          name: 'verified',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getRegisteredAddresses',
      outputs: [
        {
          internalType: 'address[]',
          name: '',
          type: 'address[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_tinNumber',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: '_contact',
          type: 'string',
        },
        {
          internalType: 'string',
          name: '_physicalAddress',
          type: 'string',
        },
        {
          internalType: 'string',
          name: '_countryOfOrigin',
          type: 'string',
        },
      ],
      name: 'register',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'registeredAddresses',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'verifyTIN',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
];

function App() {
  const [registrationContract, setRegistrationContract] = useState(null);
  const [registeredAddresses, setRegisteredAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRegistrationContract = async () => {
      try {
        // Connect to the contract
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(
          RegistrationContractAddress,
          RegistrationContractABI,
          provider
        );
        setRegistrationContract(contract);

        // Get the list of registered addresses
        const addresses = await contract.getRegisteredAddresses();
        setRegisteredAddresses(addresses);

        setLoading(false);
      } catch (error) {
        console.error('Error loading contract:', error);
      }
    };

    loadRegistrationContract();
  }, []);

  const registerEntity = async (
    tinNumber,
    contact,
    physicalAddress,
    countryOfOrigin
  ) => {
    try {
      // Call the register function of the contract
      await registrationContract.register(
        tinNumber,
        contact,
        physicalAddress,
        countryOfOrigin
      );

      // Update the list of registered addresses
      const addresses = await registrationContract.getRegisteredAddresses();
      setRegisteredAddresses(addresses);
    } catch (error) {
      console.error('Error registering entity:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Registration Form</Card.Title>
              <RegistrationForm registerEntity={registerEntity} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Registered Addresses</Card.Title>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ul>
                  {registeredAddresses.map((address, index) => (
                    <li key={index}>{address}</li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
