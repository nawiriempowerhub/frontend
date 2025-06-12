
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import ContactForm from '../components/forms/ContactForm';

const Contact = () => {
  return (
    <div className="w-100">
      {/* Hero Section with Background Image */}
      <section 
        className="text-white section-padding w-100 position-relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh',
        }}
        aria-label="Hero section with community background"
      >
        <div className="container-fluid px-3">
          <div className="text-center py-5">
            <h1 className="display-4 fw-bold mb-4">
              Contact Us
              <span className="d-block text-warning">We’re Here to Help</span>
            </h1>
            <p className="fs-4 text-white opacity-75 mb-5 mx-auto" style={{ maxWidth: '800px' }}>
              Get in touch with us to learn more about our programs, volunteer opportunities, or how you can support our mission.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link 
                to="/get-involved" 
                className="btn btn-light text-primary fw-medium px-4 py-2"
              >
                Get Involved
              </Link>
              <Link 
                to="/programs" 
                className="btn btn-outline-light fw-medium px-4 py-2"
              >
                View Our Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-fluid px-3">
          <div className="row g-4">
            {/* Contact Information */}
            <div className="col-12 col-lg-6">
              <h2 className="h3 fw-bold text-dark mb-4">
                Get in Touch
              </h2>
              <p className="fs-5 text-muted mb-5">
                We'd love to hear from you. Whether you have questions about our programs, want to get involved, or need support, we're here to help.
              </p>

              <div className="d-flex flex-column gap-3">
                <div className="card">
                  <div className="card-body d-flex align-items-center gap-3 p-3">
                    <div className="bg-primary rounded p-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                      <Mail className="text-white" style={{ width: '24px', height: '24px' }} />
                    </div>
                    <div>
                      <h3 className="fw-semibold text-dark">Email</h3>
                      <p className="text-muted">info@nawiri.org</p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body d-flex align-items-center gap-3 p-3">
                    <div className="bg-accent rounded p-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                      <Phone className="text-white" style={{ width: '24px', height: '24px' }} />
                    </div>
                    <div>
                      <h3 className="fw-semibold text-dark">Phone</h3>
                      <p className="text-muted">+254 116353925</p>
                      <p className="small text-muted">Mon-Fri, 9AM-5PM EAT</p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body d-flex align-items-start gap-3 p-3">
                    <div className="bg-primary rounded p-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                      <MapPin className="text-white" style={{ width: '24px', height: '24px' }} />
                    </div>
                    <div>
                      <h3 className="fw-semibold text-dark">Office</h3>
                      <p className="text-muted">
                        Nairobi, Kenya<br />
                        P.O. Box 12345-00100
                      </p>
                      <p className="small text-muted">Visit by appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="card mt-4">
                <div className="card-header">
                  <h5 className="card-title">Office Hours</h5>
                  <p className="card-text text-muted">
                    Our team is available during these hours to assist you.
                  </p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Monday - Friday</span>
                      <span className="fw-medium">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Saturday</span>
                      <span className="fw-medium">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Sunday</span>
                      <span className="fw-medium">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-12 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title d-flex align-items-center gap-2">
                    <Send className="w-5 h-5" />
                    <span>Send us a Message</span>
                  </h5>
                  <p className="card-text text-muted">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>
                <div className="card-body">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-fluid px-3">
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold text-dark mb-3">
              Frequently Asked Questions
            </h2>
            <p className="fs-5 text-muted">
              Find answers to common questions about our programs and how to get involved.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title fs-5">How can I volunteer?</h5>
                </div>
                <div className="card-body">
                  <p className="text-muted">
                    You can apply to volunteer through our Get Involved page. We have opportunities for various skills and time commitments.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title fs-5">Where do donations go?</h5>
                </div>
                <div className="card-body">
                  <p className="text-muted">
                    All donations directly support our programs in education, healthcare, and community development across Kenya.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title fs-5">Can I visit your programs?</h5>
                </div>
                <div className="card-body">
                  <p className="text-muted">
                    Yes! We welcome visitors to see our programs in action. Please contact us to arrange a visit.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title fs-5">How do I stay updated?</h5>
                </div>
                <div className="card-body">
                  <p className="text-muted">
                    Follow us on social media or contact us to join our newsletter for regular updates on our programs and impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="hero-gradient text-white section-padding w-100">
        <div className="container-fluid px-3">
          <div className="text-center">
            <h2 className="h3 fw-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="fs-5 text-gray-100 mb-4">
              Don't wait to get involved. Contact us today and start your journey of creating positive change in communities across Kenya.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link to="/get-involved" className="btn btn-light text-primary fw-medium px-4 py-2">
                Get Involved Now
              </Link>
              <Link to="/programs" className="btn btn-outline-light fw-medium px-4 py-2">
                Learn About Our Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
