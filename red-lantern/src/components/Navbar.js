import React, { useState } from "react";
import { Container, Form, Nav, Navbar, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useCartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function CustomNavbar({ signOut }) {
  const { cartItems } = useCartContext();
  const [navbarColor, setNavbarColor] = useState("bg-light");
  const navigation = useNavigate();

  const toCart = () => {
    navigation("/cart");
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.meal.price * item.quantity, 0);

  return (
    <div className={`d-flex justify-content-between align-items-center ${navbarColor} text-black p-3`}>
      <div className="d-flex align-items-center gap-2">
        <Nav.Link href="/">
          <img src={logo} alt="HungryHub Logo" />
        </Nav.Link>

        {/* Search Engine Form */}
        <Form className="d-flex">
          <Form.Control
            type="text"
            placeholder="Search Restaurants"
            className="btn-outline-danger"
            aria-label="Search"
            style={{ color: "red" }}
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
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Cart Button */}
        <button onClick={toCart} type="button" className="btn btn-outline-danger btn-custom mr-2">
          <span style={{ marginRight: "5px" }}>🛒</span>
          <span className="bi bi-cart" style={{ color: 'red' }}></span> {cartItemsCount} &nbsp;(${totalPrice.toFixed(2)})
        </button>
        
        {/* Alert Button */}
        <Nav.Link href="#action2" className="alert-btn">
          <span role="img" aria-label="Alert">
            🔔
          </span>
        </Nav.Link>
        
        {/* Sign Out Button */}
        <button className="btn btn-outline-danger btn-custom sign-out-btn" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
