import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
        </div>
        <footer
          className="text-center text-lg-start bg-light text-muted"
          style={{
            /*height to make the footer smaller */
            height: '80px',
            /*padding to adjust the content within the footer */
            padding: '10px 0',
            /*background color*/
            backgroundColor: '#f8f9fa',
          }}
        >
          <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div className="me-5 d-none d-lg-block"></div>
            <div>
              <a href="" className="me-4 text-reset" aria-label="Facebook">
                <i className="fa fa-facebook-f"></i>
              </a>
              <a href="" className="me-4 text-reset" aria-label="Twitter">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="" className="me-4 text-reset" aria-label="Google">
                <i className="fa fa-google"></i>
              </a>
              <a href="" className="me-4 text-reset" aria-label="Instagram">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="" className="me-4 text-reset" aria-label="LinkedIn">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
          </section>
          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Hungry Hub</h6>
                  <p>
                    Disclaimer: This application is for demonstration purposes only and does not facilitate real
                    transactions. Orders submitted through this app will not be processed, and payments will not be
                    accepted. The content and functionality showcased within this app are simulated and should not be
                    considered as representative of actual business operations.
                  </p>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                  <p>
                    <a href="#!" className="text-reset">
                      Restaurants
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Delivery
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Buy Gift Cards
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Promotions
                    </a>
                  </p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                  <p>
                    <a href="#!" className="text-reset">
                      Pricing
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Orders
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      About Hungry Hub
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Help
                    </a>
                  </p>
                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                  <p>
                    <i className="fa fa-home me-3"></i> San Diego, California
                  </p>
                  <p>
                    <i className="fa fa-envelope me-3"></i> info@hungryhub.com
                  </p>
                  <p>
                    <i className="fa fa-phone me-3"></i> CALL (619) 123-4567
                  </p>
                  <p>
                    <i className="fa fa-print me-3"></i> FAX (619) 123-5555
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="text-center p-4" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
            © 2023 COPYRIGHT:
            <a className="text-reset fw-bold" href="https://mdbootstrap.com/" style={{ marginLeft: '20px' }}>
              HUNGRYHUB.COM
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;

