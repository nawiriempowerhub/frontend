import React, { useState, useEffect } from "react";
import { ArrowRight, Users, Heart, Target, Calendar } from "lucide-react";
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
    <div className="d-flex flex-column align-items-center">
      <Spinner animation="border" variant="primary" size={spinnerSize} />
      {text && <span className="mt-3 text-muted">{text}</span>}
    </div>
  );
};

// Custom Error Message Component
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <Alert variant="danger" className="text-center border-0 shadow-sm">
      <Alert.Heading className="h5">Something went wrong!</Alert.Heading>
      <p className="mb-3">{message}</p>
      {onRetry && (
        <Button variant="outline-danger" onClick={onRetry} className="px-4">
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

        setPrograms(programsData.slice(0, 3)); // Show only first 3 programs
        setImpact(impactData.slice(0, 3)); // Show only first 3 impact stories
        setEvents(eventsData.slice(0, 2)); // Show only first 2 events
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
        <Loading size="lg" text="Loading..." />
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
    <div className="bg-light">
      {/* Hero Section */}
      <section
        className="bg-white py-4 position-relative"
        style={{
          minHeight: "40vh",
        }}
      >
        <Container className="py-4">
          <Row className="align-items-center">
            {/* Image Column - Left Side */}
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="position-relative">
                <img
                  src="/images/hero-bg.jpg"
                  alt="Nawiri Empowerhub Community Impact"
                  className="img-fluid rounded shadow-lg"
                  style={{
                    width: "100%",
                    height: "450px",
                    objectFit: "cover",
                    boxShadow: "0 4px 40px rgba(0, 0, 0, 0.3)",
                  }}
                />
              </div>
            </Col>

            {/* Text Content Column - Right Side */}
            <Col lg={6}>
              <div className="ps-lg-4">
                <h6 className="display-5 fw-semibold mb-4 lh-1 text-dark">
                  Empowering Communities, Building Futures
                </h6>
                <p className="fs-5 mb-4 text-muted lh-lg">
                  Welcome to <strong>Nawiri EmpowerHub</strong> a grassroots
                  initiative dedicated to uplifting communities across Kenya. We
                  believe in the power of education, healthcare and sustainable
                  agricultural practices to transform lives. Join us as we build
                  a brighter, more equitable future together.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3">
                  <Button
                    as={Link}
                    to="/get-involved"
                    size="lg"
                    variant="primary"
                    className="fw-semibold px-4 py-3"
                  >
                    Get Involved <ArrowRight className="ms-2" size={20} />
                  </Button>
                  <Button
                    as={Link}
                    to="/programs"
                    size="lg"
                    variant="outline-primary"
                    className="fw-semibold px-4 py-3"
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
      <section className="py-3 bg-white">
        <Container>
          <Row className="g-4">
            <Col sm={6} lg={3} className="text-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-primary"
                style={{ width: "80px", height: "80px" }}
              >
                <Users className="text-white" size={32} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-2">
                <CountUp end={100} duration={5} />+
              </h3>
              <p className="text-muted mb-0 fw-medium">Lives Impacted</p>
            </Col>

            <Col sm={6} lg={3} className="text-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-primary"
                style={{ width: "80px", height: "80px" }}
              >
                <Target className="text-white" size={32} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-2">
                <CountUp end={3} duration={5} />+
              </h3>
              <p className="text-muted mb-0 fw-medium">Active Programs</p>
            </Col>

            <Col sm={6} lg={3} className="text-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-primary"
                style={{ width: "80px", height: "80px" }}
              >
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-2">
                <CountUp end={20} duration={5} />+
              </h3>
              <p className="text-muted mb-0 fw-medium">Volunteers</p>
            </Col>

            <Col sm={6} lg={3} className="text-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-primary"
                style={{ width: "80px", height: "80px" }}
              >
                <Calendar className="text-white" size={32} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-2">
                <CountUp end={2} duration={2} />+
              </h3>
              <p className="text-muted mb-0 fw-medium">Years of Impact</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Impact Stories */}
      {impact.length > 0 && (
        <section className="py-5 bg-white">
          <Container>
            <Row className="justify-content-center text-center mb-5">
              <Col lg={8}>
                <h2 className="display-5 fw-bold text-dark mb-4">
                  Stories of Impact
                </h2>
                <p className="fs-6 text-muted lh-lg">
                  Real stories from the communities we serve, showcasing the
                  transformative power of our programs.
                </p>
              </Col>
            </Row>

            <Row className="g-4 mb-5">
              {impact.map((story) => (
                <Col key={story.id} md={6} lg={4}>
                  <Card className="h-100 border-0 shadow-sm bg-light">
                    <Card.Body className="d-flex flex-column p-4">
                      <Card.Title className="h5 fw-bold text-dark mb-3">
                        {story.title}
                      </Card.Title>
                      <Card.Text className="text-muted flex-grow-1 lh-lg">
                        {story.description}
                      </Card.Text>
                      <small className="text-muted mt-auto fw-medium">
                        {new Date(story.date).toLocaleDateString()}
                      </small>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row className="justify-content-center">
              <Col xs="auto">
                <Button
                  as={Link}
                  to="/media"
                  size="lg"
                  variant="outline-primary"
                  className="px-4 py-3 fw-semibold"
                >
                  View More Stories <ArrowRight className="ms-2" size={20} />
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="py-5 bg-white">
          <Container>
            <Row className="justify-content-center text-center mb-5">
              <Col lg={8}>
                <h4 className="display-5 fw-semibold text-dark mb-4">
                  Upcoming Events
                </h4>
                <p className=" text-muted lh-lg">
                  Stay connected with Nawiri EmpowerHub through our upcoming
                  events across Kenya. From community outreaches and youth
                  forums to healthcare drives and empowerment workshops, every
                  event is an opportunity to learn, serve, and grow together.
                  <br className="d-none d-md-block" />
                  <strong>
                    Don't miss your chance to be part of real, on-the-ground
                    impact.
                  </strong>
                </p>
              </Col>
            </Row>

            <Row className="g-4 mb-5">
              {events.map((event) => (
                <Col key={event.id} md={6}>
                  <Card className="h-100 border-0 shadow-sm bg-white">
                    <Card.Body className="d-flex flex-column p-4">
                      <Card.Title className="h5 fw-bold text-dark mb-3">
                        {event.title}
                      </Card.Title>
                      <Card.Text className="text-muted flex-grow-1 lh-lg">
                        {event.description}
                      </Card.Text>
                      <div className="d-flex align-items-center text-muted mt-auto">
                        <Calendar className="me-2" size={16} />
                        <small className="fw-medium">
                          {new Date(event.date).toLocaleDateString()}
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row className="justify-content-center">
              <Col xs="auto">
                <Button
                  as={Link}
                  to="/events"
                  size="lg"
                  variant="outline-primary"
                  className="px-4 py-3 fw-semibold"
                >
                  View All Events <ArrowRight className="ms-2" size={20} />
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-5 bg-white text-black">
  <Container>
    <Row className="justify-content-center text-center">
      <Col lg={8}>
        <h6 className="display-5 fw-semibold mb-4">
          Ready to Make a Difference?
        </h6>
        <p className="fs-5 mb-4 text-black-50 lh-lg">
          Every action—no matter how small—can change a life. Whether you lend your time, share your skills,
          or contribute resources, you become part of a growing movement to uplift communities in need.
          <br className="d-none d-md-block" />
          <strong>Take the first step today and join hands with Nawiri EmpowerHub in driving real, lasting change.</strong>
        </p>
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <Button
            as={Link}
            to="/get-involved"
            size="lg"
            className="fw-semibold px-4 py-3 text-white bg-primary border-0 hover:bg-success"
          >
            Volunteer Now <ArrowRight className="ms-2" size={20} />
          </Button>
          <Button
            as={Link}
            to="/contact"
            size="lg"
            className="fw-semibold px-4 py-3 text-black bg-white  border-3 hover:bg-primary"
          > 
            Contact Us <ArrowRight className="ms-2" size={20} />
          </Button>
        </div>
      </Col>
    </Row>
  </Container>
</section>

    </div>
  );
};

export default Home;
