import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, MapPin, Users, DollarSign, Target, Sparkles, ArrowRight } from 'lucide-react';
import Loading from '../components/ui/Loading';
import ErrorMessage from '../components/ui/ErrorMessage';
import VolunteerForm from '../components/forms/VolunteerForm';
import DonationForm from '../components/forms/DonationForm';
import { eventsService } from '../services/eventsService';

const GetInvolved = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('volunteer');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventsService.getEvents();
        setEvents(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const tabs = [
    { id: 'volunteer', label: 'Volunteer', icon: Heart },
    { id: 'donate', label: 'Donate', icon: DollarSign },
    { id: 'events', label: 'Events', icon: Calendar },
  ];

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <Loading size="lg" text="Loading opportunities..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="w-100 overflow-hidden">
      {/* Hero Section with High-Contrast Background Overlay */}
      <section 
        className="text-white section-padding w-100 position-relative"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.88) 0%, rgba(20, 83, 45, 0.88) 100%), url('/images/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-label="Hero section with community background"
      >
        <div className="container-max px-3">
          <div className="text-center py-4 py-md-5">
            <div className="hero-badge hero-badge-dark mb-3">
              <Sparkles size={16} /> Partner With Us
            </div>
            <h1 className="display-4 fw-bold mb-3 text-white">
              Get Involved, <span style={{ color: "#86efac" }}>Make a Difference</span>
            </h1>
            <p className="fs-5 text-white-50 mb-4 mx-auto lh-lg" style={{ maxWidth: '720px' }}>
              Join our mission to empower grassroots communities across Kenya. Whether through volunteering,
              donating, or participating in events, your contribution sparks lasting change.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link 
                to="/contact" 
                className="btn btn-light-custom d-inline-flex align-items-center justify-content-center"
              >
                Contact Our Team <ArrowRight className="ms-2" size={16} />
              </Link>
              <Link 
                to="/programs" 
                className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center justify-content-center"
              >
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="section-padding bg-light">
        <div className="container-max px-3">
          <div className="d-flex flex-wrap justify-content-center gap-2 gap-sm-3 mb-5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-pill-btn ${activeTab === tab.id ? 'active' : ''}`}
                  type="button"
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="mx-auto" style={{ maxWidth: '960px' }}>
            {activeTab === 'volunteer' && (
              <div>
                <div className="text-center mb-5">
                  <h2 className="display-6 fw-bold text-dark mb-3">
                    Become a Volunteer
                  </h2>
                  <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>
                    Join our team of dedicated volunteers and help us create positive, measurable change in communities across Kenya.
                  </p>
                </div>

                <div className="row g-4 mb-5">
                  <div className="col-12 col-md-4">
                    <div className="card card-hover h-100 text-center p-4">
                      <div className="stat-card-icon">
                        <Heart size={28} />
                      </div>
                      <h3 className="h5 fw-bold text-dark mb-2">Make a Difference</h3>
                      <p className="text-muted small mb-0 lh-base">
                        Directly impact lives and contribute to meaningful community programs.
                      </p>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="card card-hover h-100 text-center p-4">
                      <div className="stat-card-icon">
                        <Users size={28} />
                      </div>
                      <h3 className="h5 fw-bold text-dark mb-2">Build Connections</h3>
                      <p className="text-muted small mb-0 lh-base">
                        Connect with passionate changemakers and build lasting relationships.
                      </p>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="card card-hover h-100 text-center p-4">
                      <div className="stat-card-icon">
                        <Target size={28} />
                      </div>
                      <h3 className="h5 fw-bold text-dark mb-2">Develop Skills</h3>
                      <p className="text-muted small mb-0 lh-base">
                        Gain valuable field experience in community leadership and empowerment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card card-hover p-4 p-md-5 border-0 shadow-sm">
                  <VolunteerForm />
                </div>
              </div>
            )}

            {activeTab === 'donate' && (
              <div>
                <div className="text-center mb-5">
                  <h2 className="display-6 fw-bold text-dark mb-3">
                    Support Our Mission
                  </h2>
                  <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>
                    Your contribution directly powers our education, healthcare, and sustainable agriculture programs.
                  </p>
                </div>

                <div className="row g-4 mb-5">
                  <div className="col-12 col-md-4">
                    <div className="card card-hover h-100 text-center p-4">
                      <div className="fs-2 fw-bold text-primary mb-2">KES 250</div>
                      <h3 className="h6 fw-semibold text-dark mb-2">Student Learning Pack</h3>
                      <p className="text-muted small mb-0 lh-base">
                        Provides essential stationery and learning materials for one child for a month.
                      </p>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="card card-hover h-100 text-center p-4 border-primary">
                      <div className="badge bg-primary text-white mx-auto mb-2 rounded-pill px-3 py-1">Popular</div>
                      <div className="fs-2 fw-bold text-primary mb-2">KES 500</div>
                      <h3 className="h6 fw-semibold text-dark mb-2">Healthcare Outreach</h3>
                      <p className="text-muted small mb-0 lh-base">
                        Supports primary healthcare checkups and wellness kits for a family.
                      </p>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="card card-hover h-100 text-center p-4">
                      <div className="fs-2 fw-bold text-primary mb-2">KES 1,000</div>
                      <h3 className="h6 fw-semibold text-dark mb-2">Community Workshop</h3>
                      <p className="text-muted small mb-0 lh-base">
                        Helps fund vocational skills training modules for youth and women groups.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card card-hover p-4 p-md-5 border-0 shadow-sm">
                  <DonationForm />
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <div className="text-center mb-5">
                  <h2 className="display-6 fw-bold text-dark mb-3">
                    Upcoming Community Events
                  </h2>
                  <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>
                    Join us in person at our upcoming forums, health camps, and volunteer drives.
                  </p>
                </div>

                {events.length === 0 ? (
                  <div className="text-center py-5 card card-hover p-5">
                    <Calendar className="text-muted mx-auto mb-3" size={48} />
                    <h3 className="h5 fw-bold text-dark mb-2">No Upcoming Events Scheduled</h3>
                    <p className="text-muted mb-4 small">We are organizing upcoming activities. Reach out to get notified first!</p>
                    <div>
                      <Link to="/contact" className="btn btn-primary">
                        Contact Us for Updates
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="row g-4">
                    {events.map((event) => (
                      <div key={event.id} className="col-12 col-md-6">
                        <div className="card card-hover h-100">
                          <div className="card-body d-flex flex-column p-4">
                            <h3 className="h5 fw-bold text-dark mb-2">{event.title}</h3>
                            <p className="text-muted small flex-grow-1 mb-4">{event.description}</p>
                            
                            <div className="d-flex flex-column gap-2 small text-muted mb-4 pt-3 border-top">
                              {event.date && (
                                <div className="d-flex align-items-center gap-2">
                                  <Calendar size={16} className="text-primary" />
                                  <span>{new Date(event.date).toLocaleDateString(undefined, {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}</span>
                                </div>
                              )}
                              {event.location && (
                                <div className="d-flex align-items-center gap-2">
                                  <MapPin size={16} className="text-primary" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                              {event.capacity && (
                                <div className="d-flex align-items-center gap-2">
                                  <Users size={16} className="text-primary" />
                                  <span>{event.capacity} participants</span>
                                </div>
                              )}
                            </div>
                            
                            <Link to={`/events/${event.id}`} className="btn btn-outline-primary btn-sm w-100">
                              Register for Event &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="section-padding bg-white border-top">
        <div className="container-max px-3 text-center">
          <div className="hero-badge mb-2">Every Action Counts</div>
          <h2 className="display-6 fw-bold text-dark mb-3">
            Ready to Take The Next Step?
          </h2>
          <p className="fs-5 text-muted mb-4 mx-auto" style={{ maxWidth: '640px' }}>
            Whether you volunteer your time, make a donation, or share our mission, every contribution creates ripples of positive change.
          </p>
          <Link to="/contact" className="btn btn-primary d-inline-flex align-items-center">
            Contact Us to Learn More <ArrowRight className="ms-2" size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
