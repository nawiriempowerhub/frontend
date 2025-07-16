import React, { useState, useEffect } from "react";
import {
  Loader2,
  AlertCircle,
  CalendarDays,
  MapPin,
  Clock,
  Users,
  CheckCircle,
} from "lucide-react";
import { eventsService } from "../services/eventsService";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [registering, setRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await eventsService.getEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message || "Failed to fetch events. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
    setRegisterSuccess(null);
    setRegisterError(null);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistering(true);
    setRegisterError(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/events/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, event_id: selectedEvent.id }),
        }
      );

      if (!res.ok) throw new Error("Failed to register");

      setRegisterSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setRegisterSuccess(null);
      }, 2000);
    } catch (err) {
      setRegisterError("Registration failed. Please try again.");
    } finally {
      setRegistering(false);
    }
  };

  const formatEventDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatEventTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setRegisterSuccess(null);
    setRegisterError(null);
  };

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="bg-white py-4" style={{ minHeight: "40vh" }}>
        <div className="container py-4">
          <div className="row align-items-center">
            {/* Image Column - Left Side */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="position-relative">
                <img
                  src="/images/hero-bg.jpg"
                  alt="Upcoming Events at Nawiri Empowerhub"
                  className="img-fluid rounded shadow-lg"
                  style={{
                    width: "100%",
                    height: "450px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            {/* Text Content Column - Right Side */}
            <div className="col-lg-6">
              <div className="ps-lg-4">
                <h6 className="display-5 fw-semibold mb-4 text-dark">
                  Upcoming Events
                </h6>
                <p className="fs-5 mb-0 text-muted lh-lg">
                  Discover our events where change begins from community
                  outreaches and girls education forums to health camps and
                  sustainable agriculture initiatives.
                  <br className="d-none d-md-block" />
                  These events aren’t just dates on a calendar they’re moments
                  of action, learning, and transformation.
                  <br className="d-none d-md-block" />
                  <strong>
                    Come meet change-makers, connect with locals, and help us
                    build a better tomorrow one event at a time.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-5">
        <div className="container">
          {error && (
            <div className="row justify-content-center mb-4">
              <div className="col-lg-8">
                <div
                  className="alert alert-danger d-flex align-items-start gap-3"
                  role="alert"
                >
                  <AlertCircle
                    className="text-danger flex-shrink-0 mt-1"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <div>{error}</div>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="d-flex flex-column align-items-center justify-content-center py-5">
              <Loader2
                className="text-primary mb-3"
                style={{ width: "40px", height: "40px" }}
              />
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm text-center">
                  <div className="card-body py-5">
                    <h3 className="h4 fw-semibold text-dark mb-3">
                      No Events Scheduled
                    </h3>
                    <p className="text-muted mb-4">
                      Check back later for upcoming events
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="btn btn-primary px-4"
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {events.map((event) => (
                <div key={event.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm">
                    {/* Event Image Placeholder */}
                    <div
                      className="card-img-top bg-primary d-flex align-items-center justify-content-center text-white"
                      style={{ height: "200px" }}
                    >
                      <div className="text-center">
                        <i className="fas fa-calendar-alt fa-3x mb-2"></i>
                        <div className="fw-semibold">Event Image</div>
                      </div>
                    </div>

                    <div className="card-body d-flex flex-column">
                      {/* Event Category */}
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="badge bg-primary rounded-pill">
                          {event.category || "General"}
                        </span>
                      </div>

                      {/* Event Title */}
                      <h5 className="card-title fw-bold text-dark mb-3">
                        {event.title}
                      </h5>

                      {/* Event Description */}
                      <p className="card-text text-muted mb-4 flex-grow-1">
                        {event.description}
                      </p>

                      {/* Event Details */}
                      <div className="mb-4">
                        <div className="d-flex align-items-start gap-3 mb-3">
                          <CalendarDays
                            className="text-muted mt-1"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <div>
                            <small className="text-muted fw-medium d-block">
                              Date
                            </small>
                            <span className="text-dark">
                              {formatEventDate(event.date)}
                            </span>
                          </div>
                        </div>

                        <div className="d-flex align-items-start gap-3 mb-3">
                          <Clock
                            className="text-muted mt-1"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <div>
                            <small className="text-muted fw-medium d-block">
                              Time
                            </small>
                            <span className="text-dark">
                              {formatEventTime(event.date)}
                            </span>
                          </div>
                        </div>

                        <div className="d-flex align-items-start gap-3 mb-3">
                          <MapPin
                            className="text-muted mt-1"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <div>
                            <small className="text-muted fw-medium d-block">
                              Location
                            </small>
                            <span className="text-dark">{event.location}</span>
                          </div>
                        </div>

                        {/* {event.capacity && (
                          <div className="d-flex align-items-start gap-3">
                            <Users className="text-muted mt-1" style={{ width: '18px', height: '18px' }} />
                            <div>
                              <small className="text-muted fw-medium d-block">Capacity</small>
                              <span className="text-dark">{event.capacity} attendees</span>
                            </div>
                          </div>
                        )} */}
                      </div>

                      {/* Register Button */}
                      <button
                        className="btn btn-primary w-100 fw-medium"
                        onClick={() => handleRegisterClick(event)}
                      >
                        <i className="fas fa-user-plus me-2"></i>
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Registration Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">
                  Register for {selectedEvent?.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                {registerSuccess ? (
                  <div className="text-center py-4">
                    <CheckCircle
                      className="text-success mb-3"
                      style={{ width: "60px", height: "60px" }}
                    />
                    <h6 className="fw-bold text-success mb-2">
                      Registration Successful!
                    </h6>
                    <p className="text-muted mb-0">
                      You will receive a confirmation email shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {registerError && (
                      <div className="alert alert-danger d-flex align-items-center gap-2 mb-4">
                        <AlertCircle
                          style={{ width: "18px", height: "18px" }}
                        />
                        <small>{registerError}</small>
                      </div>
                    )}

                    <div className="row g-3">
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                          />
                          <label htmlFor="name">Full Name *</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            required
                          />
                          <label htmlFor="email">Email Address *</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            placeholder="Your Phone"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                          />
                          <label htmlFor="phone">Phone Number</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="message"
                            placeholder="Additional message"
                            style={{ height: "100px" }}
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                message: e.target.value,
                              })
                            }
                          ></textarea>
                          <label htmlFor="message">
                            Additional Message (Optional)
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="d-grid gap-2 mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg fw-medium"
                        disabled={registering}
                      >
                        {registering ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Registering...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-check me-2"></i>
                            Complete Registration
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
