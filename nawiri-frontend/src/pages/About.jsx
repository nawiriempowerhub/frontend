
import React, { useState, useEffect } from "react";
import { Users, Target, Heart } from "lucide-react";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import { aboutService } from "../services/aboutService";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    <div className="w-100">
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding w-100">
        <div className="container-fluid px-3">
          <div className="text-center">
            <h2 className="display-4 fw-bold mb-4">
              About Nawiri EmpowerHub
            </h2>
            <p className="fs-4 text-light">
              Empowering communities through sustainable development, education,
              and healthcare initiatives across Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-fluid px-3">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <h2 className="h3 fw-bold text-dark mb-4">Our Mission</h2>
              <p className="fs-5 text-muted mb-4">
                {aboutData?.mission ||
                  "To empower communities through sustainable development programs that focus on education, healthcare, and economic empowerment, creating lasting positive change in the lives of those we serve."}
              </p>

              <h2 className="h3 fw-bold text-dark mb-4">Our Vision</h2>
              <p className="fs-5 text-muted mb-4">
                {aboutData?.vision ||
                  "A world where every community has access to quality education, healthcare, and opportunities for sustainable economic growth, enabling individuals to reach their full potential."}
              </p>

              <h2 id="story" className="h3 fw-bold text-dark mb-4">
                Our Story
              </h2>
              <p className="fs-5 text-muted mb-4">
                {aboutData?.story ||
                  "Our journey began with a simple goal: to bridge the gap between opportunity and access in underserved communities. Over the years, we’ve grown into a dedicated team committed to transforming lives through consistent, grassroots engagement."}
              </p>

              <h2 id="impact-summary" className="h3 fw-bold text-dark mb-4">
                Impact Summary
              </h2>
              <p className="fs-5 text-muted mb-4">
                {aboutData?.impactSummary ||
                  "Over the past decade, we’ve impacted over 10,000 lives through education scholarships, health initiatives, and economic empowerment projects. Our programs are community-driven and results-focused."}
              </p>

              <h2 id="timeline" className="h3 fw-bold text-dark mb-4">
                Timeline
              </h2>
              <ul className="list-group list-group-flush fs-5 text-muted">
                {timelineArray.map((event, idx) => (
                  <li key={idx} className="list-group-item">
                    {event}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-12 col-lg-6">
              <div className="row g-3">
                <div className="col-12">
                  <div className="card shadow card-hover">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-center mb-3 bg-primary rounded p-3" style={{ width: "48px", height: "48px" }}>
                        <Target className="text-white" style={{ width: "24px", height: "24px" }} />
                      </div>
                      <h5 className="card-title">Our Approach</h5>
                      <p className="card-text text-muted">
                        We believe in community-driven solutions that address root
                        causes and create sustainable change.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card shadow card-hover">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-center mb-3 bg-accent rounded p-3" style={{ width: "48px", height: "48px" }}>
                        <Heart className="text-white" style={{ width: "24px", height: "24px" }} />
                      </div>
                      <h5 className="card-title">Our Values</h5>
                      <p className="card-text text-muted">
                        Integrity, compassion, sustainability, and empowerment guide
                        everything we do.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card shadow card-hover">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-center mb-3 bg-primary rounded p-3" style={{ width: "48px", height: "48px" }}>
                        <Users className="text-white" style={{ width: "24px", height: "24px" }} />
                      </div>
                      <h5 className="card-title">Our Impact</h5>
                      <p className="card-text text-muted">
                        Measurable results that transform lives and strengthen
                        communities for generations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {team.length > 0 && (
        <section className="section-padding bg-light">
          <div className="container-fluid px-3">
            <div className="text-center mb-5">
              <h2 className="h3 fw-bold text-dark mb-3">
                Meet Our Team
              </h2>
              <p className="fs-5 text-muted">
                Dedicated professionals working together to create positive
                change in communities across Kenya.
              </p>
            </div>

            <div className="row g-4">
              {team.map((member) => (
                <div key={member.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card shadow card-hover text-center">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-center mx-auto mb-3 bg-primary rounded-circle" style={{ width: "96px", height: "96px" }}>
                        {/* <span className="fs-3 fw-bold text-white">
                          {member.name?.charAt(0) || 'N'}
                        </span> */}
                      </div>
                      <h5 className="card-title">{member.name}</h5>
                      <p className="text-primary fw-medium">
                        {member.role || "Team Member"}
                      </p>
                      <img
                        src={
                          member.photo_filename
                            ? `${VITE_API_BASE_URL}/static/team/${member.photo_filename}`
                            : "/placeholder-avatar.png"
                        }
                        alt={member.name}
                        className="img-fluid mt-3 rounded"
                      />
                      <p className="text-muted mt-3">{member.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Impact Timeline */}
      {impact.length > 0 && (
        <section className="section-padding">
          <div className="container-fluid px-3">
            <div className="text-center mb-5">
              <h2 className="h3 fw-bold text-dark mb-3">
                Our Impact Journey
              </h2>
              <p className="fs-5 text-muted">
                Key milestones and achievements that mark our journey of
                creating positive change.
              </p>
            </div>

            <div className="d-flex flex-column gap-4">
              {impact.map((event, index) => (
                <div key={event.id} className="d-flex align-items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="d-flex align-items-center justify-content-center bg-primary rounded-circle text-white fw-bold" style={{ width: "48px", height: "48px" }}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="card shadow card-hover flex-grow-1">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="card-title">{event.title}</h5>
                          <p className="card-text text-muted">
                            {event.description}
                          </p>
                          <img
                            src={
                              event.image_filename || "/placeholder-image.png"
                            }
                            alt={event.title}
                            className="img-fluid mt-3 rounded"
                          />
                        </div>
                        <span className="text-muted small ms-3">
                          {new Date(event.date).getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="hero-gradient text-white section-padding w-100">
        <div className="container-fluid px-3">
          <div className="text-center">
            <h2 className="h3 fw-bold mb-4">Join Our Mission</h2>
            <p className="fs-5 text-light mb-4">
              Together, we can create lasting change and build stronger, more
              resilient communities. Your support makes all the difference.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <a
                href="/get-involved"
                className="btn btn-light text-primary fw-medium"
              >
                Get Involved
              </a>
              <a
                href="/contact"
                className="btn btn-outline-light fw-medium"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;