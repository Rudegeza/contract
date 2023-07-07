import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function RegistrationForm({ registerEntity }) {
  const [tinNumber, setTinNumber] = useState('');
  const [contact, setContact] = useState('');
  const [physicalAddress, setPhysicalAddress] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    registerEntity(tinNumber, contact, physicalAddress, countryOfOrigin);
    // Reset form fields
    setTinNumber('');
    setContact('');
    setPhysicalAddress('');
    setCountryOfOrigin('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="tinNumber">
        <Form.Label>TIN Number</Form.Label>
        <Form.Control
          type="text"
          value={tinNumber}
          onChange={(e) => setTinNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="contact">
        <Form.Label>Contact</Form.Label>
        <Form.Control
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="physicalAddress">
        <Form.Label>Physical Address</Form.Label>
        <Form.Control
          type="text"
          value={physicalAddress}
          onChange={(e) => setPhysicalAddress(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="countryOfOrigin">
        <Form.Label>Country of Origin</Form.Label>
        <Form.Control
          type="text"
          value={countryOfOrigin}
          onChange={(e) => setCountryOfOrigin(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
}

export default RegistrationForm;
