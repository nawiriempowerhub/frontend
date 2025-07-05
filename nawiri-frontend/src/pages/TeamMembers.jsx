import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Spinner,
  Alert,
  Button,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { ChevronDown, ChevronUp, Loader2, AlertCircle } from "lucide-react";

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/about/team`
        );
        setTeamMembers(response.data);
      } catch (err) {
        setError("Failed to load team members");
      } finally {
        setLoading(false);
      }
    };
    fetchTeamMembers();
  }, []);

  // Toggle between showing 3 or all team members
  const displayedMembers = showAll ? teamMembers : teamMembers.slice(0, 3);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
        <Spinner animation="border" variant="primary" size="lg" />
        <span className="ms-3 text-lg text-muted mt-3">
          Loading team members...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="p-4 rounded-3 shadow-sm">
          <div className="d-flex align-items-center gap-3 text-danger">
            <AlertCircle size={24} />
            <span className="h5 mb-0">{error}</span>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold text-primary mb-3">Meet Our Team</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            Our dedicated team at Nawiri EmpowerHub is committed to empowering
            communities through education, healthcare, and sustainable
            development.
          </p>
        </div>
        <Row className="g-4 justify-content-center">
          {displayedMembers.map((member, index) => (
            <Col xs={12} sm={6} lg={4} key={member.id}>
              <Card className="h-100 border-0 shadow-sm team-card">
                <div className="position-relative overflow-hidden">
                  <Card.Img
                    variant="top"
                    src={`${import.meta.env.VITE_API_BASE_URL}/static/team/${
                      member.photo_filename
                    }`}
                    alt={`${member.name}, ${member.role}`}
                    className="team-photo"
                    style={{
                      maxHeight: "250px", // or '300px'
                      width: "100%",
                      objectFit: "cover",
                      borderTopLeftRadius: "0.5rem",
                      borderTopRightRadius: "0.5rem",
                    }}
                  />

                  <div className="overlay"></div>
                </div>
                <Card.Body className="p-4">
                  <Card.Title className="h5 fw-bold text-dark mb-1">
                    {member.name}
                  </Card.Title>
                  <Card.Subtitle className="mb-3 text-primary fw-semibold small">
                    {member.role}
                  </Card.Subtitle>
                  <Card.Text className="text-muted small lh-base">
                    {member.bio}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {teamMembers.length > 3 && (
          <div className="text-center mt-5">
            <Button
              variant="primary"
              size="lg"
              className="px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2 rounded-pill shadow-sm view-all-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  <ChevronUp size={20} /> Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={20} /> View All
                </>
              )}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default TeamMembers;
