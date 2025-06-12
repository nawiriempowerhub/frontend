import React, { useState, useEffect } from "react";
import { Users, Target, Heart } from "lucide-react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { aboutService } from "../services/aboutService";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Custom Loading Component
const Loading = ({ size = 'md', text = 'Loading...' }) => {
  const spinnerSize = size === 'lg' ? 'lg' : 'md';
  
  return (
    <div className="d-flex flex-column align-items-center">
      <Spinner animation="border" variant="primary" size={spinnerSize} />
      {text && <span className="mt-2">{text}</span>}
    </div>
  );
};

// Custom Error Message Component
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <Alert variant="danger" className="text-center">
      <Alert.Heading>Something went wrong!</Alert.Heading>
      <p>{message}</p>
      {onRetry && (
        <Button variant="outline-danger" onClick={onRetry}>
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
        "2015 – Organization founded",
        "2017 – Launched first education program",
        "2019 – Expanded to healthcare outreach",
        "2022 – Reached 10,000+ beneficiaries",
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
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Loading size="lg" text="Loading about information..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <ErrorMessage
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="py-5 text-white position-relative"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '50vh'
        }}
      >
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h3 className="display-4 fw-bold mb-4">
                About Nawiri EmpowerHub
              </h3>
              <p className="lead fs-4 text-light">
                Empowering communities through sustainable development, education,
                and healthcare initiatives across Kenya.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-5">
        <Container>
          <Row className="g-5 align-items-center">
            <Col lg={6}>
              <h2 className="h3 fw-bold text-dark mb-4">Our Mission</h2>
              <p className="lead text-muted mb-4">
                {aboutData?.mission ||
                  "To empower communities through sustainable development programs that focus on education, healthcare, and economic empowerment, creating lasting positive change in the lives of those we serve."}
              </p>

              <h2 className="h3 fw-bold text-dark mb-4">Our Vision</h2>
              <p className="lead text-muted mb-4">
                {aboutData?.vision ||
                  "A world where every community has access to quality education, healthcare, and opportunities for sustainable economic growth, enabling individuals to reach their full potential."}
              </p>

              <h2 id="story" className="h3 fw-bold text-dark mb-4">
                Our Story
              </h2>
              <p className="lead text-muted mb-4">
                {aboutData?.story ||
                  "Our journey began with a simple goal: to bridge the gap between opportunity and access in underserved communities. Over the years, we've grown into a dedicated team committed to transforming lives through consistent, grassroots engagement."}
              </p>

              <h2 id="impact-summary" className="h3 fw-bold text-dark mb-4">
                Impact Summary
              </h2>
              <p className="lead text-muted mb-4">
                {aboutData?.impactSummary ||
                  "Over the past decade, we've impacted over 10,000 lives through education scholarships, health initiatives, and economic empowerment projects. Our programs are community-driven and results-focused."}
              </p>

              <h2 id="timeline" className="h3 fw-bold text-dark mb-4">
                Timeline
              </h2>
              <div className="list-group list-group-flush">
                {timelineArray.map((event, idx) => (
                  <div key={idx} className="list-group-item border-0 px-0 py-2">
                    <span className="lead text-muted">{event}</span>
                  </div>
                ))}
              </div>
            </Col>

            <Col lg={6}>
              <Row className="g-4">
                <Col xs={12}>
                  <Card className="h-100 shadow-sm border-0 hover-card">
                    <Card.Body className="text-center">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        }}
                      >
                        <Target className="text-white" size={32} />
                      </div>
                      <Card.Title className="h5 fw-bold">Our Approach</Card.Title>
                      <Card.Text className="text-muted">
                        We believe in community-driven solutions that address root
                        causes and create sustainable change.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={12}>
                  <Card className="h-100 shadow-sm border-0 hover-card">
                    <Card.Body className="text-center">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' 
                        }}
                      >
                        <Heart className="text-white" size={32} />
                      </div>
                      <Card.Title className="h5 fw-bold">Our Values</Card.Title>
                      <Card.Text className="text-muted">
                        Integrity, compassion, sustainability, and empowerment guide
                        everything we do.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={12}>
                  <Card className="h-100 shadow-sm border-0 hover-card">
                    <Card.Body className="text-center">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        }}
                      >
                        <Users className="text-white" size={32} />
                      </div>
                      <Card.Title className="h5 fw-bold">Our Impact</Card.Title>
                      <Card.Text className="text-muted">
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
        <section className="py-5 bg-light">
          <Container>
            <Row className="justify-content-center text-center mb-5">
              <Col lg={8}>
                <h2 className="display-5 fw-bold text-dark mb-4">
                  Meet Our Team
                </h2>
                <p className="lead text-muted">
                  Dedicated professionals working together to create positive
                  change in communities across Kenya.
                </p>
              </Col>
            </Row>

            <Row className="g-4">
              {team.map((member) => (
                <Col key={member.id} md={6} lg={4}>
                  <Card className="h-100 shadow-sm border-0 hover-card text-center">
                    <Card.Body>
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{ 
                          width: '96px', 
                          height: '96px', 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        }}
                      >
                        <span className="fs-3 fw-bold text-white">
                          {member.name?.charAt(0) || 'N'}
                        </span>
                      </div>
                      <Card.Title className="h5 fw-bold">{member.name}</Card.Title>
                      <p className="text-primary fw-medium mb-3">
                        {member.role || "Team Member"}
                      </p>
                      {member.photo_filename && (
                        <img
                          src={`${VITE_API_BASE_URL}/static/team/${member.photo_filename}`}
                          alt={member.name}
                          className="img-fluid rounded mb-3"
                          style={{ maxHeight: '200px', objectFit: 'cover' }}
                        />
                      )}
                      <Card.Text className="text-muted">{member.bio}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Impact Timeline */}
      {impact.length > 0 && (
        <section className="py-5">
          <Container>
            <Row className="justify-content-center text-center mb-5">
              <Col lg={8}>
                <h2 className="display-5 fw-bold text-dark mb-4">
                  Our Impact Journey
                </h2>
                <p className="lead text-muted">
                  Key milestones and achievements that mark our journey of
                  creating positive change.
                </p>
              </Col>
            </Row>

            <div className="timeline">
              {impact.map((event, index) => (
                <Row key={event.id} className="mb-4 align-items-start">
                  <Col xs="auto">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{ 
                        width: '48px', 
                        height: '48px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      }}
                    >
                      {index + 1}
                    </div>
                  </Col>
                  <Col>
                    <Card className="shadow-sm border-0 hover-card">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <Card.Title className="h5 fw-bold">{event.title}</Card.Title>
                            <Card.Text className="text-muted mb-3">
                              {event.description}
                            </Card.Text>
                            {event.image_filename && (
                              <img
                                src={event.image_filename}
                                alt={event.title}
                                className="img-fluid rounded"
                                style={{ maxHeight: '200px', objectFit: 'cover' }}
                              />
                            )}
                          </div>
                          <span className="text-muted small ms-3 flex-shrink-0">
                            {new Date(event.date).getFullYear()}
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Call to Action */}
      <section 
        className="py-5 text-white"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-4">Join Our Mission</h2>
              <p className="lead text-light mb-4">
                Together, we can create lasting change and build stronger, more
                resilient communities. Your support makes all the difference.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button 
                  href="/get-involved"
                  size="lg" 
                  variant="light"
                  className="fw-semibold"
                >
                  Get Involved
                </Button>
                <Button 
                  href="/contact"
                  size="lg" 
                  variant="outline-light"
                  className="fw-semibold"
                >
                  Contact Us
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Custom CSS for hover effects */}
      <style jsx>{`
        .hover-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
        .timeline {
          position: relative;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 23px;
          top: 60px;
          bottom: 0;
          width: 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
};

export default About;

