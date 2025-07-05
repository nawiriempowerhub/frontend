import React, { useState, useEffect } from "react";
import { Users, Target, Heart, ArrowRight, Calendar } from "lucide-react";
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
import { aboutService } from "../services/aboutService";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [team, setTeam] = useState([]);
  const [impact, setImpact] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const timelineArray = Array.isArray(aboutData?.timeline)
    ? aboutData.timeline
    : [
        "2022 – Organization founded",
        "2024 – Officially registered as a non-profit",
        "2024 – Launched our first community program- Kilimo Kazi Agri-Youth Project",
        "2025 – Started performing Outreach programs example the Heshima ya Dada Pad Program",
      ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [aboutInfo, teamData, impactData] = await Promise.all([
          aboutService.getAbout(),
          aboutService.getTeam(),
          aboutService.getImpact(),
        ]);

        setAboutData(aboutInfo);
        setTeam(teamData);
        setImpact(impactData);
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
        <Loading size="lg" text="Loading about information..." />
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
        className="text-white py-5 position-relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "60vh",
        }}
      >
        <Container className="py-5">
          <Row className="align-items-center justify-content-center text-center">
            <Col lg={10} xl={8}>
              <h1 className="display-4 fw-bold mb-4 lh-1">
                About Nawiri EmpowerHub
                <span className="d-block text-warning">
                  Empowering Communities
                </span>
              </h1>
              <p className="fs-5 mb-5 text-white-50 lh-lg">
                Empowering communities through sustainable development,
                education, and healthcare initiatives across Kenya.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button
                  as={Link}
                  to="/get-involved"
                  size="lg"
                  variant="light"
                  className="fw-semibold px-4 py-3"
                >
                  Get Involved <ArrowRight className="ms-2" size={20} />
                </Button>
                <Button
                  as={Link}
                  to="/contact"
                  size="lg"
                  variant="outline-light"
                  className="fw-semibold px-4 py-3"
                >
                  Contact Us
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="display-5 fw-bold text-dark mb-4">
                Our Mission & Vision
              </h2>
              <p className="fs-6 text-muted lh-lg">
                Learn about our purpose, values, and the journey that drives us
                to create lasting change in communities.
              </p>
            </Col>
          </Row>
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <h3 className="h5 fw-bold text-dark mb-3">Our Mission</h3>
              <p className="text-muted lh-lg mb-4">
                {aboutData?.mission ||
                  "To empower communities through sustainable development programs that focus on education, healthcare, and economic empowerment, creating lasting positive change in the lives of those we serve."}
              </p>

              <h3 className="h5 fw-bold text-dark mb-3">Our Vision</h3>
              <p className="text-muted lh-lg mb-4">
                {aboutData?.vision ||
                  "A world where every community has access to quality education, healthcare, and opportunities for sustainable economic growth, enabling individuals to reach their full potential."}
              </p>

              <h3 id="story" className="h5 fw-bold text-dark mb-3">
                Our Story
              </h3>
              <p className="text-muted lh-lg mb-4">
                {aboutData?.story ||
                  "Our journey began with a simple goal: to bridge the gap between opportunity and access in underserved communities. Over the years, we've grown into a dedicated team committed to transforming lives through consistent, grassroots engagement."}
              </p>
            </Col>
            <Col lg={6}>
              <Row className="g-4">
                <Col xs={12}>
                  <Card className="h-100 border-0 shadow-sm bg-white">
                    <Card.Body className="text-center p-4">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-primary"
                        style={{ width: "80px", height: "80px" }}
                      >
                        <Target className="text-white" size={32} />
                      </div>
                      <Card.Title className="h5 fw-bold text-dark mb-3">
                        Our Approach
                      </Card.Title>
                      <Card.Text className="text-muted lh-lg">
                        We believe in community-driven solutions that address
                        root causes and create sustainable change.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12}>
                  <Card className="h-100 border-0 shadow-sm bg-white">
                    <Card.Body className="text-center p-4">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-success"
                        style={{ width: "80px", height: "80px" }}
                      >
                        <Heart className="text-white" size={32} />
                      </div>
                      <Card.Title className="h5 fw-bold text-dark mb-3">
                        Our Values
                      </Card.Title>
                      <Card.Text className="text-muted lh-lg">
                        Integrity, compassion, sustainability, and empowerment
                        guide everything we do.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12}>
                  <Card className="h-100 border-0 shadow-sm bg-white">
                    <Card.Body className="text-center p-4">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-danger"
                        style={{ width: "80px", height: "80px" }}
                      >
                        <Users className="text-white" size={32} />
                      </div>
                      <Card.Title className="h5 fw-bold text-dark mb-3">
                        Our Impact
                      </Card.Title>
                      <Card.Text className="text-muted lh-lg">
                        Measurable results that transform lives and strengthen
                        communities for generations.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      {team.length > 0 && (
        <section className="py-5 bg-white">
          <Container>
            <Row className="justify-content-center text-center mb-5">
              <Col lg={8}>
                <h2 className="display-5 fw-bold text-dark mb-4">
                  Meet Our Team
                </h2>
                <p className="fs-6 text-muted lh-lg">
                  Dedicated professionals working together to create positive
                  change in communities across Kenya.
                </p>
              </Col>
            </Row>

            {/* ✅ Only show up to 3 team members */}
            <Row className="g-4 mb-5">
              {team.slice(0, 3).map((member) => (
                <Col key={member.id} md={6} lg={4}>
                  <Card className="h-100 border-0 shadow-sm bg-white">
                    <Card.Body className="d-flex flex-column p-4 text-center">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-primary"
                        style={{ width: "96px", height: "96px" }}
                      >
                        <span className="fs-3 fw-bold text-white">
                          {member.name?.charAt(0) || "N"}
                        </span>
                      </div>
                      <Card.Title className="h5 fw-bold text-dark mb-3">
                        {member.name}
                      </Card.Title>
                      <p className="text-primary fw-medium mb-3">
                        {member.role || "Team Member"}
                      </p>
                      {member.photo_filename && (
                        <img
                          src={`${VITE_API_BASE_URL}/static/team/${member.photo_filename}`}
                          alt={member.name}
                          className="img-fluid rounded mb-3"
                          style={{ maxHeight: "200px", objectFit: "cover" }}
                        />
                      )}
                      <Card.Text className="text-muted flex-grow-1 lh-lg">
                        {member.bio}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Button to view full team */}
            <Row className="justify-content-center">
              <Col xs="auto">
                <Button
                  as={Link}
                  to="/team"
                  size="lg"
                  variant="outline-primary"
                  className="px-4 py-3 fw-semibold"
                >
                  View All Team Members{" "}
                  <ArrowRight className="ms-2" size={20} />
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Impact Timeline */}
      {impact.length > 0 && (
        <section className="py-5 bg-white">
          <Container>
            <Row className="justify-content-center text-center mb-5">
              <Col lg={8}>
                <h2 className="display-5 fw-bold text-dark mb-4">
                  Our Impact Journey
                </h2>
                <p className="fs-6 text-muted lh-lg">
                  Key milestones and achievements that mark our journey of
                  creating positive change.
                </p>
              </Col>
            </Row>
            <Row className="g-4 mb-5">
              {impact.map((event) => (
                <Col key={event.id} md={6} lg={4}>
                  <Card className="h-100 border-0 shadow-sm bg-light">
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
                  to="/impact"
                  size="lg"
                  variant="outline-primary"
                  className="px-4 py-3 fw-semibold"
                >
                  View More Impact Stories{" "}
                  <ArrowRight className="ms-2" size={20} />
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Timeline Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="display-5 fw-bold text-dark mb-4">Our Timeline</h2>
              <p className="fs-6 text-muted lh-lg">
                A brief history of our milestones and achievements over the
                years.
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col xs={12}>
              <Card className="h-100 border-0 shadow-sm bg-white">
                <Card.Body className="p-4">
                  {timelineArray.map((event, idx) => (
                    <div key={idx} className="d-flex align-items-start mb-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3"
                        style={{
                          width: "48px",
                          height: "48px",
                          background: "#0d6efd",
                        }}
                      >
                        {idx + 1}
                      </div>
                      <p className="text-muted lh-lg mb-0">{event}</p>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-white text-black">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-4">Join Our Mission</h2>
              <p className="fs-5 mb-5 text-muted lh-lg">
                Together, we can create lasting change and build stronger, more
                resilient communities. Your support makes all the difference.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button
                  as={Link}
                  to="/get-involved"
                  size="lg"
                  variant="light"
                  className="fw-semibold px-4 py-3 text-white bg-primary border-0 hover:bg-success"
                >
                  Get Involved <ArrowRight className="ms-2" size={20} />
                </Button>
                <Button
                  as={Link}
                  to="/contact"
                  size="lg"
                  className="fw-semibold px-4 py-3 text-white bg-primary border-0 hover:bg-secondary"
                >
                  Contact Us
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;
