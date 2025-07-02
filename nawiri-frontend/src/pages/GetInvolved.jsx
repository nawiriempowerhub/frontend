
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, MapPin, Users, DollarSign, Target } from 'lucide-react';
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
        setEvents(data);
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
      <div classNameName="min-vh-100 d-flex align-items-center justify-content-center">
        <Loading size="lg" text="Loading opportunities..." />
      </div>
    );
  }

  if (error) {
    return (
      <div classNameName="min-vh-100 d-flex align-items-center justify-content-center">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="w-100">
      {/* Hero Section with Background Image */}
      <section 
        className="text-white section-padding w-100 position-relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh',
        }}
        aria-label="Hero section with community background"
      >
        <div className="container-fluid px-3">
          <div className="text-center py-5">
            <h1 className="display-4 fw-bold mb-4">
              Get Involved
              <span className="d-block text-warning">Make a Difference</span>
            </h1>
            <p className="fs-4 text-white opacity-75 mb-5 mx-auto" style={{ maxWidth: '800px' }}>
              Join our mission to empower communities. Whether through volunteering, donating, or participating in events, your contribution makes a difference.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link 
                to="/contact" 
                className="btn btn-light text-primary fw-medium px-4 py-2"
              >
                Contact Us
              </Link>
              <Link 
                to="/programs" 
                className="btn btn-outline-light fw-medium px-4 py-2"
              >
                View Our Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="section-padding">
        <div className="container-fluid px-3">
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`d-flex align-items-center gap-2 px-4 py-2 rounded-pill fw-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover-bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'volunteer' && (
              <div>
                <div className="text-center mb-5">
                  <h2 className="h3 fw-bold text-dark mb-3">
                    Become a Volunteer
                  </h2>
                  <p className="fs-5 text-muted">
                    Join our team of dedicated volunteers and help us create positive change in communities across Kenya.
                  </p>
                </div>

                <div className="row g-4 mb-5">
                  <div className="col-12 col-md-4">
                    <div className="card text-center">
                      <div className="card-header">
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
                          <Heart className="text-white" style={{ width: '32px', height: '32px' }} />
                        </div>
                        <h5 className="card-title">Make a Difference</h5>
                        <p className="card-text text-muted">
                          Directly impact lives and contribute to meaningful change in communities.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="card text-center">
                      <div className="card-header">
                        <div className="bg-accent rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
                          <Users className="text-white" style={{ width: '32px', height: '32px' }} />
                        </div>
                        <h5 className="card-title">Build Connections</h5>
                        <p className="card-text text-muted">
                          Connect with like-minded individuals and build lasting relationships.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="card text-center">
                      <div className="card-header">
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
                          <Target className="text-white" style={{ width: '32px', height: '32px' }} />
                        </div>
                        <h5 className="card-title">Develop Skills</h5>
                        <p className="card-text text-muted">
                          Gain valuable experience and develop new skills while serving others.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <VolunteerForm />
              </div>
            )}

            {activeTab === 'donate' && (
              <div>
                <div className="text-center mb-5">
                  <h2 className="h3 fw-bold text-dark mb-3">
                    Support Our Mission
                  </h2>
                  <p className="fs-5 text-muted">
                    Your donation helps us expand our programs and reach more communities in need.
                  </p>
                </div>

                <div className="row g-4 mb-5">
                  <div className="col-12 col-md-4">
                    <div className="card text-center">
                      <div className="card-header">
                        <h5 className="card-title fs-3 text-primary">sh250</h5>
                        <p className="card-text text-muted">
                          Provides educational materials for one child for a month.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="card text-center">
                      <div className="card-header">
                        <h5 className="card-title fs-3 text-primary">sh500</h5>
                        <p className="card-text text-muted">
                          Supports healthcare services for a family for one month.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="card text-center">
                      <div className="card-header">
                        <h5 className="card-title fs-3 text-primary">sh1000</h5>
                        <p className="card-text text-muted">
                          Funds a complete skills training workshop for 10 participants.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <DonationForm />
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <div className="text-center mb-5">
                  <h2 className="h3 fw-bold text-dark mb-3">
                    Upcoming Events
                  </h2>
                  <p className="fs-5 text-muted">
                    Join us at our upcoming events and be part of the change you want to see.
                  </p>
                </div>

                {events.length === 0 ? (
                  <div className="text-center py-5">
                    <Calendar className="text-gray-400 mx-auto mb-3" style={{ width: '64px', height: '64px' }} />
                    <h3 className="fs-3 fw-semibold text-dark mb-3">No Upcoming Events</h3>
                    <p className="text-muted mb-4">We're planning exciting new events. Check back soon!</p>
                    <Link to="/contact" className="btn btn-primary">
                      Contact Us for Updates
                    </Link>
                  </div>
                ) : (
                  <div className="row g-4">
                    {events.map((event) => (
                      <div key={event.id} className="col-12 col-md-6">
                        console.log("Events:", events);

                        <div className="card card-hover">
                          <div className="card-header">
                            <h5 className="card-title fs-5">{event.title}</h5>
                            <p className="card-text text-muted">{event.description}</p>
                          </div>
                          <div className="card-body">
                            <div className="d-flex flex-column gap-3">
                              {event.date && (
                                <div className="d-flex align-items-center gap-2 small text-muted">
                                  <Calendar style={{ width: '16px', height: '16px' }} />
                                  <span>{new Date(event.date).toLocaleDateString()}</span>
                                </div>
                              )}
                              {event.location && (
                                <div className="d-flex align-items-center gap-2 small text-muted">
                                  <MapPin style={{ width: '16px', height: '16px' }} />
                                  <span>{event.location}</span>
                                </div>
                              )}
                              {event.capacity && (
                                <div className="d-flex align-items-center gap-2 small text-muted">
                                  <Users style={{ width: '16px', height: '16px' }} />
                                  <span>{event.capacity} participants</span>
                                </div>
                              )}
                            </div>
                            <Link to={`/events/${event.id}`} className="btn btn-primary w-100 mt-3">
                              Register for Event
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

      {/* Call to Action */}
      <section className="hero-primary text-gray-700 section-padding w-100">
        <div className="container-fluid px-3">
          <div className="text-center">
            <h2 className="h3 fw-bold mb-4 text-gray-600 opacity-55">
              Every Action Counts
            </h2>
            <p className="fs-5 text-gray-700 mb-4">
              Whether you volunteer your time, make a donation, or attend our events, every action contributes to positive change in communities across Kenya.
            </p>
            <Link to="/contact" className="btn btn-outline-primary text-primary fw-medium px-4 py-2">
              Contact Us to Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
