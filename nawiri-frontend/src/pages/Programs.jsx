import React, { useState, useEffect } from "react";
import { ArrowRight, Users, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import { programsService } from "../services/programsService";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Carousel } from "react-bootstrap";

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const data = await programsService.getPrograms();
        setPrograms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Loading size="lg" text="Loading programs..." />
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
    <div className="w-100">
      {/* Hero Section with Background Image */}
      <section className="bg-white py-4" style={{ minHeight: "40vh" }}>
        <Container className="py-4">
          <Row className="align-items-center">
            {/* Image Column - Left Side */}
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="position-relative rounded shadow-lg overflow-hidden">
                <Carousel fade indicators={false}>
                  <Carousel.Item>
                    <img
                      src="/images/agric-1.jpg"
                      className="d-block w-100"
                      alt="Skill development session"
                      style={{
                        height: "600px",
                        objectFit: "cover",
                      }}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src="/images/agric-2.jpg"
                      className="d-block w-100"
                      alt="Youth in agriculture"
                      style={{
                        height: "600px",
                        objectFit: "cover",
                      }}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src="/images/agric-3.jpg"
                      className="d-block w-100"
                      alt="Community digital training"
                      style={{
                        height: "600px",
                        objectFit: "cover",
                      }}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src="/images/agric-4.jpg"
                      className="d-block w-100"
                      alt="Girls mentorship program"
                      style={{
                        height: "600px",
                        objectFit: "cover",
                      }}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src="/images/agric-5.jpg"
                      className="d-block w-100"
                      alt="Health outreach session"
                      style={{
                        height: "600px",
                        objectFit: "cover",
                      }}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src="/images/about-nawiri.jpg"
                      className="d-block w-100"
                      alt="Climate-smart farming workshop"
                      style={{
                        height: "600px",
                        objectFit: "cover",
                      }}
                    />
                  </Carousel.Item>
                </Carousel>
              </div>
            </Col>

            {/* Text Content Column - Right Side */}
            <Col lg={6}>
              <div className="ps-lg-4">
                <h2 className="display-6 fw-semibold mb-4 text-dark">
                  Our Programs Transforming Lives
                </h2>
                <p className="fs-5 text-black-50 lh-lg mb-5">
                  Welcome to Nawiri EmpowerHub Programs Section. Our programs
                  are community-centered, rooted in education, health, and
                  sustainable development. From menstrual health education and
                  leadership training to digital literacy and climate-smart
                  agriculture, we equip youth and women with the tools to rise
                  and lead in their communities.
                  <br />
                  Each initiative is a step toward a more just, equitable, and
                  empowered society—where no one is left behind.
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
                    to="/contact"
                    size="lg"
                    variant="outline-primary"
                    className="fw-semibold px-4 py-3"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Programs Grid */}
      <section className="py-5 py-md-6 bg-white">
        <div className="container px-3 px-md-4">
          {programs.length === 0 ? (
            <div className="text-center py-5 my-4">
              <h3 className="fs-3 fw-semibold text-dark mb-3">
                No Programs Available
              </h3>
              <p className="text-muted mb-4 fs-5">
                We're working on exciting new programs. Check back soon!
              </p>
              <Link to="/contact" className="btn btn-primary btn-lg px-4">
                Contact Us for More Information
              </Link>
            </div>
          ) : (
            <div className="row g-4">
              {programs.map((program) => (
                <div key={program.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm border-0 hover-shadow transition-all">
                    <div className="card-header bg-white border-bottom-0 pb-0">
                      <h5 className="card-title fs-5 fw-semibold text-dark">
                        {program.title}
                      </h5>
                      <p className="card-text text-muted mt-2">
                        {program.description}
                      </p>
                    </div>
                    <div className="card-body pt-0">
                      <div className="d-flex flex-column gap-3 mb-4">
                        {/* {program.location && (
                          <div className="d-flex align-items-center gap-2 small text-muted">
                            <MapPin className="flex-shrink-0" style={{ width: '16px', height: '16px' }} />
                            <span>{program.location}</span>
                          </div>
                        )} */}
                        {/* {program.participants && (
                          <div className="d-flex align-items-center gap-2 small text-muted">
                            <Users className="flex-shrink-0" style={{ width: '16px', height: '16px' }} />
                            <span>{program.participants} participants</span>
                          </div>
                        )} */}
                        {/* {program.start_date && (
                          <div className="d-flex align-items-center gap-2 small text-muted">
                            <Calendar className="flex-shrink-0" style={{ width: '16px', height: '16px' }} />
                            <span>Started {new Date(program.start_date).toLocaleDateString()}</span>
                          </div>
                        )} */}
                      </div>
                      <Link
                        to={`/programs/${program.id}`}
                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                      >
                        Learn More{" "}
                        <ArrowRight
                          className="ms-2"
                          style={{ width: "16px", height: "16px" }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white text-black py-5 py-md-6 w-100">
        <div className="container px-3 px-md-4">
          <div className="text-center">
            <h2 className="h3 fw-bold mb-4">Want to Support Our Programs?</h2>
            <p
              className="fs-5 text-black opacity-55 mb-5 mx-auto"
              style={{ maxWidth: "800px" }}
            >
              Your support helps us expand our reach and create more
              opportunities for communities to thrive.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link
                to="/get-involved"
                className="btn btn-primary text-white fw-medium px-4 d-flex align-items-center justify-content-center"
              >
                Get Involved{" "}
                <ArrowRight
                  className="ms-2"
                  style={{ width: "16px", height: "16px" }}
                />
              </Link>
              <Link
                to="/contact"
                className="btn btn-outline-primary fw-medium px-4"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
