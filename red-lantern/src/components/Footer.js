import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer class="text-center text-lg-start bg-light text-muted">
                <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

                    <div class="me-5 d-none d-lg-block">
                    </div>

                    <div>
                        <a href="" class="me-4 text-reset" aria-label="Facebook">
                            <i class="fa fa-facebook-f"></i>
                        </a>
                        <a href="" class="me-4 text-reset" aria-label="Twitter">
                            <i class="fa fa-twitter"></i>
                        </a>
                        <a href="" class="me-4 text-reset" aria-label="Google">
                            <i class="fa fa-google"></i>
                        </a>
                        <a href="" class="me-4 text-reset" aria-label="Instagram">
                            <i class="fa fa-instagram"></i>
                        </a>
                        <a href="" class="me-4 text-reset" aria-label="LinkedIn">
                            <i class="fa fa-linkedin"></i>
                        </a>
                    </div>

                </section>
                <section class="">
                    <div class="container text-center text-md-start mt-5">
                        <div class="row mt-3">
                            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">
                                    Hungry Hub
                                </h6>
                                <p>
                                    Disclaimer: This application is for demonstration purposes only and does not facilitate real transactions. Orders submitted through this app will not be processed, and payments will not be accepted. The content and functionality showcased within this app are simulated and should not be considered as representative of actual business operations.
                                </p>
                            </div>
                            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">
                                    Products
                                </h6>
                                <p>
                                    <a href="#!" class="text-reset">Restaurants</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">Delivery</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">Buy Gift Cards</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">Promotions</a>
                                </p>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">
                                    Useful links
                                </h6>
                                <p>
                                    <a href="#!" class="text-reset">Pricing</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">Orders</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">About Hungry Hub</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">Help</a>
                                </p>
                            </div>
                            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i class="fa fa-home me-3"></i> San Diego, California</p>
                                <p>
                                    <i class="fa fa-envelope me-3"></i>
                                    info@hungryhub.com
                                </p>
                                <p><i class="fa fa-phone me-3"></i> CALL (619) 123-4567</p>
                                <p><i class="fa fa-print me-3"></i> FAX  (619) 123-5555</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-4" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
                    © 2023 COPYRIGHT:
                    <a
                        className="text-reset fw-bold"
                        href="https://mdbootstrap.com/"
                        style={{ marginLeft: '20px' }}
                    >
                        HUNGRYHUB.COM
                    </a>
                </div>


            </footer>

        </>
    )
};

export default Footer;

