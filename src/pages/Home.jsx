import React, { useState, useEffect } from "react";
import { ArrowRight, Users, Heart, Target, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { programsService } from "../services/programsService";
import { aboutService } from "../services/aboutService";
import { eventsService } from "../services/eventsService";
import CountUp from "react-countup";

// Custom Loading Component
const Loading = ({ size = "md", text = "Loading..." }) => {
  const spinnerSize = size === "lg" ? "lg" : "md";

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner animation="border" variant="success" size={spinnerSize} />
      {text && <span className="mt-3 text-muted fw-medium">{text}</span>}
    </div>
  );
};

// Custom Error Message Component
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <Alert variant="danger" className="text-center border-0 shadow-sm rounded-4 p-4">
      <Alert.Heading className="h5 fw-bold">Something went wrong</Alert.Heading>
      <p className="mb-3 text-muted">{message}</p>
      {onRetry && (
        <Button variant="outline-danger" onClick={onRetry} className="px-4 rounded-pill">
          Try Again
        </Button>
      )}
    </Alert>
  );
};

const Home = () => {
  const [programs, setPrograms] = useState([]);
  const [impact, setImpact] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [programsData, impactData, eventsData] = await Promise.all([
          programsService.getPrograms(),
          aboutService.getImpact(),
          eventsService.getEvents(),
        ]);

        setPrograms(programsData ? programsData.slice(0, 3) : []);
        setImpact(impactData ? impactData.slice(0, 3) : []);
        setEvents(eventsData ? eventsData.slice(0, 2) : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <Loading size="lg" text="Loading Nawiri EmpowerHub..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
        <div style={{ maxWidth: "500px", width: "100%" }}>
          <ErrorMessage
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-100 overflow-hidden">
      {/* Hero Section */}
      <section className="bg-white section-padding position-relative border-bottom">
        <Container>
          <Row className="align-items-center g-4 g-lg-5">
            {/* Image Column - Left Side */}
            <Col lg={6} className="order-2 order-lg-1">
              <div className="position-relative">
                <div 
                  className="position-absolute rounded-4"
                  style={{
                    inset: "-12px",
                    background: "radial-gradient(circle, rgba(22, 163, 74, 0.2) 0%, rgba(22, 163, 74, 0) 70%)",
                    zIndex: 0,
                    pointerEvents: "none",
                  }}
                />
                <img
                  src="/images/hero-bg.jpg"
                  alt="Nawiri EmpowerHub Community Impact"
                  className="img-fluid rounded-4 position-relative"
                  style={{
                    width: "100%",
                    maxHeight: "480px",
                    minHeight: "280px",
                    objectFit: "cover",
                    zIndex: 1,
                    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15)",
                  }}
                />
              </div>
            </Col>

            {/* Text Content Column - Right Side */}
            <Col lg={6} className="order-1 order-lg-2">
              <div className="ps-lg-3">
                <div className="hero-badge mb-3">
                  <Sparkles size={16} /> Empowering Grassroots Communities
                </div>

                <h1 className="display-5 fw-bold mb-3 text-dark lh-sm">
                  Empowering Communities,{" "}
                  <span className="text-primary">Building Futures</span>
                </h1>

                <p className="fs-5 mb-4 text-muted lh-lg">
                  Welcome to <strong>Nawiri EmpowerHub</strong>, a grassroots
                  initiative dedicated to uplifting communities across Kenya. We
                  believe in the power of education, healthcare, and sustainable
                  practices to transform lives.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3 pt-2">
                  <Button
                    as={Link}
                    to="/get-involved"
                    size="lg"
                    className="btn btn-primary d-inline-flex align-items-center justify-content-center"
                  >
                    Get Involved <ArrowRight className="ms-2" size={18} />
                  </Button>
                  <Button
                    as={Link}
                    to="/programs"
                    size="lg"
                    className="btn btn-outline-primary d-inline-flex align-items-center justify-content-center"
                  >
                    Our Programs
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-white border-bottom">
        <Container>
          <Row className="g-4 justify-content-center">
            <Col xs={6} md={3} className="text-center stat-card">
              <div className="stat-card-icon">
                <Users size={28} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-1">
                <CountUp end={100} duration={3} />+
              </h3>
              <p className="text-muted mb-0 fw-medium small text-uppercase" style={{ letterSpacing: "0.5px" }}>
                Lives Impacted
              </p>
            </Col>

            <Col xs={6} md={3} className="text-center stat-card">
              <div className="stat-card-icon">
                <Target size={28} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-1">
                <CountUp end={3} duration={3} />+
              </h3>
              <p className="text-muted mb-0 fw-medium small text-uppercase" style={{ letterSpacing: "0.5px" }}>
                Active Programs
              </p>
            </Col>

            <Col xs={6} md={3} className="text-center stat-card">
              <div className="stat-card-icon">
                <Heart size={28} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-1">
                <CountUp end={20} duration={3} />+
              </h3>
              <p className="text-muted mb-0 fw-medium small text-uppercase" style={{ letterSpacing: "0.5px" }}>
                Volunteers
              </p>
            </Col>

            <Col xs={6} md={3} className="text-center stat-card">
              <div className="stat-card-icon">
                <Calendar size={28} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-1">
                <CountUp end={2} duration={2} />+
              </h3>
              <p className="text-muted mb-0 fw-medium small text-uppercase" style={{ letterSpacing: "0.5px" }}>
                Years of Impact
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Impact Stories */}
      {impact.length > 0 && (
        <section className="section-padding bg-light">
          <Container>
            <div className="text-center mb-5">
              <div className="hero-badge mb-2">Our Footprint</div>
              <h2 className="display-6 fw-bold text-dark mb-3">
                Stories of Impact
              </h2>
              <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
                Real stories from the communities we serve, showcasing the
                transformative power of collective grassroots action.
              </p>
            </div>

            <Row className="g-4 mb-5">
              {impact.map((story) => (
                <Col key={story.id} md={6} lg={4}>
                  <Card className="h-100 card-hover border-0">
                    <Card.Body className="d-flex flex-column p-4">
                      <Card.Title className="h5 fw-bold text-dark mb-3">
                        {story.title}
                      </Card.Title>
                      <Card.Text className="text-muted flex-grow-1 lh-base">
                        {story.description}
                      </Card.Text>
                      <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                        <small className="text-muted fw-medium">
                          {new Date(story.date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </small>
                        <span className="text-primary small fw-semibold">Story &rarr;</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className="text-center">
              <Button
                as={Link}
                to="/media"
                size="lg"
                className="btn btn-outline-primary d-inline-flex align-items-center"
              >
                View More Stories <ArrowRight className="ms-2" size={18} />
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="section-padding bg-white border-top">
          <Container>
            <div className="text-center mb-5">
              <div className="hero-badge mb-2">Join Our Activities</div>
              <h2 className="display-6 fw-bold text-dark mb-3">
                Upcoming Events
              </h2>
              <p className="text-muted mx-auto" style={{ maxWidth: "680px" }}>
                Stay connected with Nawiri EmpowerHub through our upcoming
                community outreaches, youth forums, and healthcare drives across Kenya.
              </p>
            </div>

            <Row className="g-4 mb-5">
              {events.map((event) => (
                <Col key={event.id} md={6}>
                  <Card className="h-100 card-hover">
                    <Card.Body className="d-flex flex-column p-4">
                      <div className="d-flex align-items-center text-primary mb-2">
                        <Calendar className="me-2" size={16} />
                        <small className="fw-semibold">
                          {new Date(event.date).toLocaleDateString(undefined, {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </small>
                      </div>
                      <Card.Title className="h5 fw-bold text-dark mb-3">
                        {event.title}
                      </Card.Title>
                      <Card.Text className="text-muted flex-grow-1 lh-base">
                        {event.description}
                      </Card.Text>
                      <div className="mt-3 pt-3 border-top">
                        <Link 
                          to={`/events/${event.id}`} 
                          className="btn btn-light-custom btn-sm w-100 text-center"
                        >
                          Event Details & Registration
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className="text-center">
              <Button
                as={Link}
                to="/events"
                size="lg"
                className="btn btn-outline-primary d-inline-flex align-items-center"
              >
                View All Events <ArrowRight className="ms-2" size={18} />
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="section-padding bg-light position-relative border-top">
        <Container>
          <div 
            className="rounded-4 p-4 p-md-5 text-center text-white position-relative overflow-hidden shadow-sm"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #14532d 100%)",
            }}
          >
            <div 
              className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
              style={{
                backgroundImage: `radial-gradient(#22c55e 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
            <div className="position-relative" style={{ zIndex: 1, maxWidth: "720px", margin: "0 auto" }}>
              <div className="hero-badge hero-badge-dark mb-3">
                <Sparkles size={16} /> Join The Movement
              </div>
              <h2 className="display-6 fw-bold mb-3 text-white">
                Ready to Make a Difference?
              </h2>
              <p className="fs-5 mb-4 text-white-50 lh-lg">
                Every action—no matter how small—can change a life. Whether you lend your time, share your skills,
                or contribute resources, you become part of a growing movement to uplift communities in need.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button
                  as={Link}
                  to="/get-involved"
                  size="lg"
                  className="btn btn-primary d-inline-flex align-items-center justify-content-center"
                >
                  Volunteer Now <ArrowRight className="ms-2" size={18} />
                </Button>
                <Button
                  as={Link}
                  to="/contact"
                  size="lg"
                  className="btn btn-light-custom d-inline-flex align-items-center justify-content-center"
                > 
                  Contact Us <ArrowRight className="ms-2" size={18} />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
