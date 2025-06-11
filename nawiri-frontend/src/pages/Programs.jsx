
import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loading from '../components/ui/Loading';
import ErrorMessage from '../components/ui/ErrorMessage';
import { programsService } from '../services/programsService';

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
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="w-100">
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding w-100">
        <div className="container-fluid px-3">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">
              Our Programs
            </h1>
            <p className="fs-4 text-gray-100">
              Comprehensive initiatives designed to empower communities through education, healthcare, and sustainable development.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section-padding">
        <div className="container-fluid px-3">
          {programs.length === 0 ? (
            <div className="text-center py-5">
              <h3 className="fs-3 fw-semibold text-dark mb-3">No Programs Available</h3>
              <p className="text-muted mb-4">We're working on exciting new programs. Check back soon!</p>
              <a href="/contact" className="btn btn-primary">
                Contact Us for More Information
              </a>
            </div>
          ) : (
            <div className="row g-4">
              {programs.map((program) => (
                <div key={program.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card card-hover">
                    <div className="card-header">
                      <h5 className="card-title fs-5">{program.title}</h5>
                      <p className="card-text text-muted">{program.description}</p>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-column gap-3 mb-4">
                        {program.location && (
                          <div className="d-flex align-items-center gap-2 small text-muted">
                            <MapPin style={{ width: '16px', height: '16px' }} />
                            <span>{program.location}</span>
                          </div>
                        )}
                        {program.participants && (
                          <div className="d-flex align-items-center gap-2 small text-muted">
                            <Users style={{ width: '16px', height: '16px' }} />
                            <span>{program.participants} participants</span>
                          </div>
                        )}
                        {program.start_date && (
                          <div className="d-flex align-items-center gap-2 small text-muted">
                            <Calendar style={{ width: '16px', height: '16px' }} />
                            <span>Started {new Date(program.start_date).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      <a href={`/programs/${program.id}`} className="btn btn-primary w-100">
                        Learn More <ArrowRight className="ms-2" style={{ width: '16px', height: '16px' }} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="hero-gradient text-white section-padding w-100">
        <div className="container-fluid px-3">
          <div className="text-center">
            <h2 className="h3 fw-bold mb-4">
              Want to Support Our Programs?
            </h2>
            <p className="fs-5 mb-4 text-gray-100">
              Your support helps us expand our reach and create more opportunities for communities to thrive.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <a href="/get-involved" className="btn btn-light text-primary hover-bg-gray-100 fw-medium">
                Get Involved <ArrowRight className="ms-2" style={{ width: '16px', height: '16px' }} />
              </a>
              <a href="/contact" className="btn btn-outline-light fw-medium">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
