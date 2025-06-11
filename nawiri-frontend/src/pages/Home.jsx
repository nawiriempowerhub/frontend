import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Heart, Target, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { programsService } from '../services/programsService';
import { aboutService } from '../services/aboutService';
import { eventsService } from '../services/eventsService';

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
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Loading size="lg" text="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
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
          minHeight: '70vh'
        }}
      >
        <Container className="h-100">
          <Row className="h-100 align-items-center justify-content-center text-center">
            <Col lg={10} xl={8}>
              <h1 className="display-3 fw-bold mb-4">
                Empowering Communities,
                <span className="d-block text-warning">Building Futures</span>
              </h1>
              <p className="lead fs-4 mb-5 text-light">
                Join us in creating lasting change through education, healthcare, and sustainable development programs across Kenya.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button 
                  as={Link} 
                  to="/get-involved" 
                  size="lg" 
                  variant="light"
                  className="fw-semibold"
                >
                  Get Involved <ArrowRight className="ms-2" size={20} />
                </Button>
                <Button 
                  as={Link} 
                  to="/programs" 
                  size="lg" 
                  variant="outline-light"
                  className="fw-semibold"
                >
                  Our Programs
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4">
            <Col md={6} lg={3} className="text-center">
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
              <h3 className="display-6 fw-bold text-dark mb-2">1,000+</h3>
              <p className="text-muted mb-0">Lives Impacted</p>
            </Col>
            <Col md={6} lg={3} className="text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' 
                }}
              >
                <Target className="text-white" size={32} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-2">15+</h3>
              <p className="text-muted mb-0">Active Programs</p>
            </Col>
            <Col md={6} lg={3} className="text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                }}
              >
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-2">50+</h3>
              <p className="text-muted mb-0">Volunteers</p>
            </Col>
            <Col md={6} lg={3} className="text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' 
                }}
              >
                <Calendar className="text-white" size={32} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-2">5+</h3>
              <p className="text-muted mb-0">Years of Impact</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Programs */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="display-4 fw-bold text-dark mb-4">
                Our Featured Programs
              </h2>
              <p className="lead text-muted">
                Discover how we're making a difference through our comprehensive programs designed to empower communities and create lasting change.
              </p>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            {programs.map((program) => (
              <Col key={program.id} md={6} lg={4}>
                <Card className="h-100 shadow-sm border-0 hover-card">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h5 fw-bold">{program.title}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">
                      {program.description}
                    </Card.Text>
                    <Button 
                      as={Link} 
                      to={`/programs/${program.id}`} 
                      variant="outline-primary"
                      className="mt-auto"
                    >
                      Learn More <ArrowRight className="ms-2" size={16} />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="justify-content-center">
            <Col xs="auto">
              <Button as={Link} to="/programs" size="lg" variant="primary">
                View All Programs <ArrowRight className="ms-2" size={20} />
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Impact Stories */}
      {impact.length > 0 && (
        <section className="py-5 bg-light">
          <Container>
            <Row className="justify-content-center text-center mb-5">
              <Col lg={8}>
                <h2 className="display-4 fw-bold text-dark mb-4">
                  Stories of Impact
                </h2>
                <p className="lead text-muted">
                  Real stories from the communities we serve, showcasing the transformative power of our programs.
                </p>
              </Col>
            </Row>

            <Row className="g-4 mb-5">
              {impact.map((story) => (
                <Col key={story.id} md={6} lg={4}>
                  <Card className="h-100 shadow-sm border-0 hover-card">
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="h5 fw-bold">{story.title}</Card.Title>
                      <Card.Text className="text-muted flex-grow-1">
                        {story.description}
                      </Card.Text>
                      <small className="text-muted mt-auto">
                        {new Date(story.date).toLocaleDateString()}
                      </small>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row className="justify-content-center">
              <Col xs="auto">
                <Button as={Link} to="/media" size="lg" variant="outline-primary">
                  View More Stories <ArrowRight className="ms-2" size={20} />
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="py-5">
          <Container>
            <Row className="justify-content-center text-center mb-5">
              <Col lg={8}>
                <h2 className="display-4 fw-bold text-dark mb-4">
                  Upcoming Events
                </h2>
                <p className="lead text-muted">
                  Join us at our upcoming events and be part of the change you want to see in the world.
                </p>
              </Col>
            </Row>

            <Row className="g-4 mb-5">
              {events.map((event) => (
                <Col key={event.id} md={6}>
                  <Card className="h-100 shadow-sm border-0 hover-card">
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="h5 fw-bold">{event.title}</Card.Title>
                      <Card.Text className="text-muted flex-grow-1">
                        {event.description}
                      </Card.Text>
                      <div className="d-flex align-items-center text-muted mt-auto">
                        <Calendar className="me-2" size={16} />
                        <small>{new Date(event.date).toLocaleDateString()}</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row className="justify-content-center">
              <Col xs="auto">
                <Button as={Link} to="/events" size="lg" variant="outline-primary">
                  View All Events <ArrowRight className="ms-2" size={20} />
                </Button>
              </Col>
            </Row>
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
              <h2 className="display-4 fw-bold mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="lead mb-5 text-light">
                Your support can transform lives and build stronger communities. Join us today and be part of something bigger.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button 
                  as={Link} 
                  to="/get-involved" 
                  size="lg" 
                  variant="light"
                  className="fw-semibold"
                >
                  Volunteer Now <ArrowRight className="ms-2" size={20} />
                </Button>
                <Button 
                  as={Link} 
                  to="/contact" 
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
      `}</style>
    </div>
  );
};

export default Home;

