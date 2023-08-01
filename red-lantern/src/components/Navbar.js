import React, { useState } from 'react';
import { Container, Form, Nav, Navbar, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import logo from '../assets/logo.png';

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
        <div className="d-flex justify-content-between align-items-center bg-white text-black p-3">
            <div className="d-flex align-items-center gap-3">
                <Nav.Link href="#action1">
                    <img src={logo} alt="HungryHub Logo" />
                </Nav.Link>
                <Nav.Link href="#action2">Start Order</Nav.Link>
                <Nav.Link href="#action2">Alerts</Nav.Link>
            </div>

            <Form className="d-flex">
                <Form.Control
                    type="text" // Change type to "text"
                    placeholder="Search Restaurants"
                    className="me-1"
                    aria-label="Search"
                />
                <Button variant="outline-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg></Button>
            </Form>

            <button
                type="button"
                className="btn btn-outline-dark"
                onClick={addToCart}
            >
                Cart Items <span className="bi bi-cart"></span> {cartItems}
            </button>

            {/* Use OverlayTrigger to show the popover when the button is clicked */}
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <span className="bi bi-cart cart-icon"></span>
            </OverlayTrigger>

            <button
                className="btn btn-outline-dark"
                onClick={signOut}
            >
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
