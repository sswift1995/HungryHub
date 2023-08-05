import React from 'react';
import { Container, Form, Nav, Navbar, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { useCartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CustomNavbar({ signOut }) {
  const { cartItems } = useCartContext();

  const navigation = useNavigate();

  // Cart button logic
  const toCart = () => {
    navigation('/cart');
  };

  // Calculate the price of all items
  const totalPrice = cartItems.reduce((total, item) => total + item.meal.price * item.quantity, 0);

  return (
    <div className="d-flex justify-content-between align-items-center bg-white text-black p-3">
      <div className="d-flex align-items-center gap-3">
        <Nav.Link href="/">
          <img src={logo} alt="HungryHub Logo" />
        </Nav.Link>
        <Nav.Link href="#action2">Start Order</Nav.Link>
        <Nav.Link href="#action2">Alerts</Nav.Link>
      </div>

      <Form className="d-flex">
        <Form.Control
          type="text"
          placeholder="Search Restaurants"
          className="me-1"
          aria-label="Search"
        />
        <Button variant="outline-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </Button>
      </Form>

      <button onClick={toCart} type="button" className="btn btn-outline-dark">
        Cart <span className="bi bi-cart"></span>(${totalPrice.toFixed(2)})
      </button>

      <button className="btn btn-outline-dark" onClick={signOut}>
        Sign Out
      </button>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {/* You can add more content here if needed */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}