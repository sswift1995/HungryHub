import React, { useState } from 'react';
import { Container, Form, Nav, Navbar, OverlayTrigger, Popover, Button } from 'react-bootstrap';

export default function CustomNavbar({ signOut }) {
  const [cartItems, setCartItems] = useState(0);

  const addToCart = () => {
    setCartItems((prevCount) => prevCount + 1);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Cart Items</Popover.Title>
      <Popover.Content>
        {/* Display the list of cart items here */}
        <p>Item 1</p>
        <p>Item 2</p>
        {/* ... */}
      </Popover.Content>
    </Popover>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', color: 'black', padding: '10px' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Nav.Link href="#action1">HungryHub</Nav.Link>
        <Nav.Link href="#action2">Start Order</Nav.Link>
        <Nav.Link href="#action2">Alerts</Nav.Link>
      </div>

      <Form className="d-flex">
        <Form.Control
          type="Find Restaurants"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>

      <button type="button" button style={{ padding: '10px', backgroundColor: "transparent", color: '#black', border: '1px solid black', borderRadius: '5px', cursor: 'pointer' }} onClick={addToCart}>
        Cart Items <span className="bi bi-cart"></span> {cartItems}
      </button>

      {/* Use OverlayTrigger to show the popover when the button is clicked */}
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <span className="bi bi-cart cart-icon"></span>
      </OverlayTrigger>

      <button style={{ padding: '10px', backgroundColor: "transparent", color: '#black', border: '1px solid black', borderRadius: '5px', cursor: 'pointer' }} onClick={signOut}>Sign Out</button>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
