import React, { useState, useEffect } from "react";
import { Container, Form, Nav, Navbar, Card, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useCartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useTotalPriceContext } from "../contexts/TotalPriceContext";
import './Navbar.css'; // Assuming the CSS file is in the same directory

export default function CustomNavbar({ signOut }) {
  const { cartItems } = useCartContext();
  const { resetCartItems } = useCartContext();
  const { resetTotalPrice, totalPrice, setTotalPrice } = useTotalPriceContext();
  const navigation = useNavigate();

  useEffect(() => {
    // Calculate the total price whenever cartItems change
    const newTotalPrice = cartItems.reduce(
      (total, item) => total + item.meal.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartItems, setTotalPrice]);

  const toCart = () => {
    navigation("/cart");
  };

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className={`d-flex justify-content-between align-items-center text-black p-3`}>
      <div className="d-flex align-items-center gap-3">
        <Nav.Link href="/">
          <img src={logo} alt="HungryHub Logo" />
        </Nav.Link>
      </div>



      {/*Search Engine Form Function*/}
      <Form className="d-flex">
        <Form.Control
          type="text"
          placeholder="Search Restaurants"
          className="btn-outline-danger" //theme color
          aria-label="Search"
          style={{ color: 'red' }}
        />
        <Button variant="outline-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search" //search icon
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </Button>
      </Form>


      {/* Alert Icon */}
      <Card button="type" className="btn btn-outline-danger btn-custom">
        <Nav.Link
          href="#action2"
          className="alert-icon text-danger"
        ><div className="d-flex justify-content-center align-items-center gap-3 flex-grow-1">


          </div>

          <span className="bi bi-bell" style={{ color: "white" }}>
            🔔</span>
        </Nav.Link>
      </Card>


      <button
        onClick={toCart}
        type="button"
        className="btn btn-outline-danger btn-custom"
      >
        <span style={{ marginRight: "5px" }}>🛒</span>
        <span className="bi bi-cart" style={{ color: 'red' }}></span> {cartItems.length} &nbsp;(${totalPrice.toFixed(2)})
      </button>


      <button className="btn btn-outline-danger btn-custom" onClick={signOut}>
        Sign Out
      </button>

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