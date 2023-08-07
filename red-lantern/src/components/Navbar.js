import React from "react";
import { Form, Nav, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useCartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function CustomNavbar({ signOut, searchQuery, setSearchQuery }) {
  const navigation = useNavigate();
  const { cartItems } = useCartContext();
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.meal.price * item.quantity, 0);

  const toCart = () => {
    navigation("/cart");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`d-flex flex-column flex-md-row justify-content-between align-items-center bg-light text-black p-3`}>
      <div className="d-flex align-items-center gap-2">
        <Nav.Link href="/">
          <img src={logo} alt="HungryHub Logo" />
        </Nav.Link>
        {/* Search Engine Form */}
        <Form className="d-flex">
          <Form.Control
            type="text"
            placeholder="Search"
            className="btn-outline-danger"
            aria-label="Search"
            style={{ color: "red" }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
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