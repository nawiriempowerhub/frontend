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
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh',
        }}
      >
        <Container className="py-5">
          <Row className="align-items-center justify-content-center text-center">
            <Col lg={10} xl={8}>
              <h1 className="display-4 fw-bold mb-4 lh-1">
                Empowering Communities,
                <span className="d-block text-warning">Building Futures</span>
              </h1>
              <p className="fs-5 mb-5 text-white-50 lh-lg">
                Join us in creating lasting change through education, healthcare, and sustainable development programs across Kenya.
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
                  to="/programs" 
                  size="lg" 
                  variant="outline-light"
                  className="fw-semibold px-4 py-3"
                >
                  Our Programs
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="g-4">
            <Col sm={6} lg={3} className="text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-primary"
                style={{ width: '80px', height: '80px' }}
              >
                <Users className="text-white" size={32} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-2">1,000+</h3>
              <p className="text-muted mb-0 fw-medium">Lives Impacted</p>
            </Col>
            <Col sm={6} lg={3} className="text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-success"
                style={{ width: '80px', height: '80px' }}
              >
                <Target className="text-white" size={32} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-2">15+</h3>
              <p className="text-muted mb-0 fw-medium">Active Programs</p>
            </Col>
            <Col sm={6} lg={3} className="text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-danger"
                style={{ width: '80px', height: '80px' }}
              >
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-2">50+</h3>
              <p className="text-muted mb-0 fw-medium">Volunteers</p>
            </Col>
            <Col sm={6} lg={3} className="text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-warning"
                style={{ width: '80px', height: '80px' }}
              >
                <Calendar className="text-white" size={32} />
              </div>
              <h3 className="display-6 fw-bold text-dark mb-2">5+</h3>
              <p className="text-muted mb-0 fw-medium">Years of Impact</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Programs */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="display-5 fw-bold text-dark mb-4">
                Our Featured Programs
              </h2>
              <p className="fs-6 text-muted lh-lg">
                Discover how we're making a difference through our comprehensive programs designed to empower communities and create lasting change.
              </p>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            {programs.map((program) => (
              <Col key={program.id} md={6} lg={4}>
                <Card className="h-100 border-0 shadow-sm bg-white">
                  <Card.Body className="d-flex flex-column p-4">
                    <Card.Title className="h5 fw-bold text-dark mb-3">{program.title}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1 lh-lg">
                      {program.description}
                    </Card.Text>
                    <Button 
                      as={Link} 
                      to={`/programs/${program.id}`} 
                      variant="outline-primary"
                      className="mt-auto fw-medium"
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
              <Button as={Link} to="/programs" size="lg" variant="primary" className="px-4 py-3 fw-semibold">
                View All Programs <ArrowRight className="ms-2" size={20} />
              </Button>
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
                  Real stories from the communities we serve, showcasing the transformative power of our programs.
                </p>
              </Col>
            </Row>

            <Row className="g-4 mb-5">
              {impact.map((story) => (
                <Col key={story.id} md={6} lg={4}>
                  <Card className="h-100 border-0 shadow-sm bg-light">
                    <Card.Body className="d-flex flex-column p-4">
                      <Card.Title className="h5 fw-bold text-dark mb-3">{story.title}</Card.Title>
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
                <Button as={Link} to="/media" size="lg" variant="outline-primary" className="px-4 py-3 fw-semibold">
                  View More Stories <ArrowRight className="ms-2" size={20} />
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="py-5 bg-light">
          <Container>
            <Row className="justify-content-center text-center mb-5">
              <Col lg={8}>
                <h2 className="display-5 fw-bold text-dark mb-4">
                  Upcoming Events
                </h2>
                <p className="fs-6 text-muted lh-lg">
                  Join us at our upcoming events and be part of the change you want to see in the world.
                </p>
              </Col>
            </Row>

            <Row className="g-4 mb-5">
              {events.map((event) => (
                <Col key={event.id} md={6}>
                  <Card className="h-100 border-0 shadow-sm bg-white">
                    <Card.Body className="d-flex flex-column p-4">
                      <Card.Title className="h5 fw-bold text-dark mb-3">{event.title}</Card.Title>
                      <Card.Text className="text-muted flex-grow-1 lh-lg">
                        {event.description}
                      </Card.Text>
                      <div className="d-flex align-items-center text-muted mt-auto">
                        <Calendar className="me-2" size={16} />
                        <small className="fw-medium">{new Date(event.date).toLocaleDateString()}</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row className="justify-content-center">
              <Col xs="auto">
                <Button as={Link} to="/events" size="lg" variant="outline-primary" className="px-4 py-3 fw-semibold">
                  View All Events <ArrowRight className="ms-2" size={20} />
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="fs-5 mb-5 text-white-50 lh-lg">
                Your support can transform lives and build stronger communities. Join us today and be part of something bigger.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button 
                  as={Link} 
                  to="/get-involved" 
                  size="lg" 
                  variant="light"
                  className="fw-semibold px-4 py-3"
                >
                  Volunteer Now <ArrowRight className="ms-2" size={20} />
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
    </div>
  );
};

export default Home;

