import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Calendar, MapPin, Target, X, Heart, Share2 } from "lucide-react";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import { programsService } from "../services/programsService";
import { mediaService } from "../services/mediaService";

const ProgramDetail = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        setLoading(true);
        const [programData, mediaData] = await Promise.all([
          programsService.getProgram(id),
          mediaService.getMediaByProgram(id),
        ]);

        setProgram(programData);
        setMedia(mediaData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProgramData();
    }
  }, [id]);

  const openLightbox = (item) => {
    setSelectedImage(item);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <Loading size="lg" text="Loading program details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <ErrorMessage
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <ErrorMessage message="Program not found" />
      </div>
    );
  }

  return (
    <div className="w-100">
      {/* Hero Section */}
      <section className="hero-white text-black section-padding w-100" style={{
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        // minHeight: '60vh'
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'rgba(0,0,0,0.3)',
          zIndex: 1
        }}></div>
        
        <div className="container-fluid px-4 py-5 position-relative" style={{ zIndex: 1 }}>
          {/* Navigation */}
          <div className="mb-4">
            <a href="/programs" className="btn btn-outline-light btn-lg rounded-pill px-4">
              <ArrowLeft className="me-2" size={18} />
              Back to Programs
            </a>
          </div>

          {/* Hero Content */}
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-8">
              <div className="text-white">
                <h1 className="display-3 fw-bold mb-4 text-shadow">{program.title}</h1>
                <p className="fs-4 mb-4 text-white-50 lh-lg">{program.description}</p>
                
                {/* Action Buttons */}
                <div className="d-flex flex-wrap gap-3 mt-4">
                  <a href="/get-involved" className="btn btn-primary btn-lg px-4 fw-semibold">
                    <Heart className="me-2" size={18} />
                    Get Involved
                  </a>
                  <button className="btn btn-outline-light btn-lg px-4">
                    <Share2 className="me-2" size={18} />
                    Share Program
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-fluid px-3">
          <div className="row g-5">
            {/* Main Content Column */}
            <div className="col-12 col-lg-8">
              {/* Featured Image */}
              {/* {program.featured_image_url && (
                <div className="mb-5">
                  <div className="card border-0 shadow-lg overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${program.featured_image_url}`}
                      alt={program.title}
                      className="card-img-top"
                      style={{
                        height: '400px',
                        objectFit: 'cover',
                        width: '100%',
                      }}
                    />
                  </div>
                </div>
              )}

              About Section */}
              <div className="card border-0 shadow-sm mb-5">
                <div className="card-body p-5">
                  <h2 className="h2 fw-bold text-primary mb-4 border-bottom border-primary pb-3">
                    About This Program
                  </h2>
                  <div className="fs-5 text-muted lh-lg">
                    <p className="mb-4">
                      {program.description ||
                        "The Heshima ya Dada Pad Program is a grassroots menstrual health initiative under the Nawiri EmpowerHub umbrella, dedicated to restoring dignity, confidence, and opportunity to girls and women across underserved communities in Kenya. We believe that menstruation should never be a barrier to education, participation, or self-worth. Yet, thousands of girls miss school or drop out entirely due to period poverty, stigma, and lack of access to sanitary products. Heshima ya Dada, meaning \"A Girl's Dignity\" in Swahili, was created as a powerful response to this injustice."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Program Objectives */}
              {program.objectives && Array.isArray(program.objectives) && (
                <div className="card border-0 shadow-sm mb-5">
                  <div className="card-body p-5">
                    <h3 className="h3 fw-bold text-primary mb-4 border-bottom border-primary pb-3">
                      Program Objectives
                    </h3>
                    <div className="row g-3">
                      {program.objectives.map((objective, index) => (
                        <div key={index} className="col-12">
                          <div className="d-flex align-items-start">
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" 
                                 style={{ width: '32px', height: '32px', fontSize: '14px', fontWeight: 'bold' }}>
                              {index + 1}
                            </div>
                            <p className="fs-5 text-muted mb-0 lh-lg">{objective}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Target Group */}
              {program.target_group && program.target_group.length > 0 && (
                <div className="card border-0 shadow-sm mb-5">
                  <div className="card-body p-5">
                    <h3 className="h3 fw-bold text-primary mb-4 border-bottom border-primary pb-3">
                      Target Audience
                    </h3>
                    <div className="row g-3">
                      {program.target_group.map((group, index) => (
                        <div key={index} className="col-md-6">
                          <div className="bg-light rounded p-3 h-100">
                            <div className="d-flex align-items-center">
                              <Users className="text-primary me-3" size={24} />
                              <span className="fs-5 text-dark fw-medium">{group}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Why This Program Exists */}
              {program.reason && Array.isArray(program.reason) && (
                <div className="card border-0 shadow-sm mb-5">
                  <div className="card-body p-5">
                    <h3 className="h3 fw-bold text-primary mb-4 border-bottom border-primary pb-3">
                      Why This Program Exists
                    </h3>
                    <div className="row g-4">
                      {program.reason.map((item, index) => (
                        <div key={index} className="col-12">
                          <div className="bg-warning bg-opacity-10 border-start border-warning border-4 p-4 rounded-end">
                            <p className="fs-5 text-dark mb-0 lh-lg">{item}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Key Activities */}
              {program.key_activities && Array.isArray(program.key_activities) && (
                <div className="card border-0 shadow-sm mb-5">
                  <div className="card-body p-5">
                    <h3 className="h3 fw-bold text-primary mb-4 border-bottom border-primary pb-3">
                      Key Activities
                    </h3>
                    <div className="row g-3">
                      {program.key_activities.map((activity, index) => (
                        <div key={index} className="col-lg-6">
                          <div className="bg-success bg-opacity-10 border border-success border-opacity-25 rounded p-4 h-100">
                            <div className="d-flex align-items-start">
                              <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" 
                                   style={{ width: '24px', height: '24px', fontSize: '12px', fontWeight: 'bold' }}>
                                ✓
                              </div>
                              <p className="fs-6 text-dark mb-0 lh-lg">{activity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Impact */}
              {program.impact && Array.isArray(program.impact) && (
                <div className="card border-0 shadow-sm mb-5">
                  <div className="card-body p-5">
                    <h3 className="h3 fw-bold text-primary mb-4 border-bottom border-primary pb-3">
                      Program Impact
                    </h3>
                    <div className="row g-4">
                      {program.impact.map((impactItem, index) => (
                        <div key={index} className="col-12">
                          <div className="bg-info bg-opacity-10 border-start border-info border-4 p-4 rounded-end">
                            <p className="fs-5 text-dark mb-0 lh-lg fw-medium">{impactItem}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Invitation */}
              {program.invitations && (
                <div className="card border-0 shadow-sm mb-5">
                  <div className="card-body p-5 text-black">
                    <h3 className="h3 fw-bold mb-4">Join Our Mission</h3>
                    <p className="fs-5 mb-4 lh-lg opacity-90">{program.invitations}</p>
                    <a href="/get-involved" className="btn btn-primary px-4 fw-semibold">
                      Get Started Today
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-12 col-xl-4">
              <div className="" style={{ top: '2rem' }}>
                {/* Program Information Card */}
                <div className="card border-0 shadow-lg mb-4">
                  <div className="card-header bg-primary text-white py-3">
                    <h5 className="card-title mb-0 fw-bold">Program Information</h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex flex-column gap-4">
                      {program.reasons && (
                        <div className="d-flex align-items-start gap-3">
                          <div className="bg-primary bg-opacity-10 rounded-circle p-2">
                            <Users className="text-primary" size={20} />
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="fw-bold text-dark mb-1">Importance</h6>
                            <p className="text-muted mb-0 small lh-base">
                              {program.reasons} - Why it matters
                            </p>
                          </div>
                        </div>
                      )}

                      {program.start_date && (
                        <div className="d-flex align-items-start gap-3">
                          <div className="bg-success bg-opacity-10 rounded-circle p-2">
                            <Calendar className="text-success" size={20} />
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="fw-bold text-dark mb-1">Start Date</h6>
                            <p className="text-muted mb-0 small">
                              {new Date(program.start_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      )}

                      {program.status && (
                        <div className="d-flex align-items-start gap-3">
                          <div className="bg-info bg-opacity-10 rounded-circle p-2">
                            <Target className="text-info" size={20} />
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="fw-bold text-dark mb-1">Status</h6>
                            <span className={`badge rounded-pill px-3 py-2 ${
                              program.status.toLowerCase() === 'active' ? 'bg-success' :
                              program.status.toLowerCase() === 'completed' ? 'bg-primary' :
                              'bg-warning'
                            }`}>
                              {program.status}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Get Involved Card */}
                <div className="card border-0 shadow-lg mb-4">
                  <div className="card-header bg-gradient text-white py-3" style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}>
                    <h5 className="card-title mb-0 fw-bold">Get Involved</h5>
                    <p className="card-text mb-0 small opacity-90">
                      Support this program and help us create lasting change.
                    </p>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-grid gap-3">
                      <a href="/get-involved" className="btn btn-primary btn-lg rounded-pill fw-semibold">
                        <Heart className="me-2" size={18} />
                        Volunteer Now
                      </a>
                      <a href="/contact" className="btn btn-outline-primary btn-lg rounded-pill fw-semibold">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Card (if data available) */}
                <div className="card border-0 shadow-lg">
                  <div className="card-header bg-light py-3">
                    <h5 className="card-title mb-0 fw-bold text-dark">Quick Stats</h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="row g-3 text-center">
                      <div className="col-6">
                        <div className="bg-primary bg-opacity-10 rounded p-3">
                          <h4 className="fw-bold text-primary mb-1">500+</h4>
                          <small className="text-muted">Lives Impacted</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="bg-success bg-opacity-10 rounded p-3">
                          <h4 className="fw-bold text-success mb-1">50+</h4>
                          <small className="text-muted">Volunteers</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Gallery */}
      {media.length > 0 && media.some((item) => item.type === "PHOTO") && (
        <section className="py-5 bg-white">
          <div className="container-fluid px-4">
            <div className="text-center mb-5">
              <h2 className="h2 fw-bold text-primary mb-3">Program Gallery</h2>
              <p className="fs-5 text-muted">See our program in action</p>
            </div>
            
            <div className="row g-4">
              {media
                .filter((item) => item.type === "PHOTO")
                .map((item) => (
                  <div key={item.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm h-100 overflow-hidden position-relative group">
                      <div className="position-relative overflow-hidden">
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}${item.file_url}`}
                          alt={item.title}
                          className="card-img-top transition-transform"
                          style={{ 
                            aspectRatio: "16/9", 
                            objectFit: "cover",
                            cursor: "pointer",
                            transition: "transform 0.3s ease"
                          }}
                          onClick={() => openLightbox(item)}
                          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                        />
                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-0 d-flex align-items-center justify-content-center transition-opacity"
                             style={{ 
                               transition: "background-color 0.3s ease",
                               cursor: "pointer"
                             }}
                             onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(0,0,0,0.3)"}
                             onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(0,0,0,0)"}
                             onClick={() => openLightbox(item)}>
                          <span className="text-white fw-bold opacity-0 transition-opacity"
                                style={{ transition: "opacity 0.3s ease" }}
                                onMouseEnter={(e) => e.target.style.opacity = "1"}
                                onMouseLeave={(e) => e.target.style.opacity = "0"}>
                            Click to view
                          </span>
                        </div>
                      </div>
                      
                      <div className="card-body p-4">
                        <h5 className="card-title fw-bold text-dark mb-2">{item.title}</h5>
                        {item.description && (
                          <p className="card-text text-muted small lh-base mb-0">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Lightbox Modal */}
      {selectedImage && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="lightboxModalLabel"
          aria-hidden="false"
          style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
          onClick={closeLightbox}
        >
          <div
            className="modal-dialog modal-xl modal-dialog-centered"
            role="document"
          >
            <div
              className="modal-content bg-transparent border-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header border-0 p-3 position-absolute top-0 end-0" style={{ zIndex: 1050 }}>
                <button
                  type="button"
                  className="btn btn-outline-light rounded-circle p-2"
                  aria-label="Close"
                  onClick={closeLightbox}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="modal-body p-0 text-center">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${selectedImage.file_url}`}
                  alt={selectedImage.title}
                  className="img-fluid rounded shadow-lg"
                  style={{
                    maxHeight: "85vh",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
                <div className="mt-4 text-white">
                  <h4 className="fw-bold mb-2">{selectedImage.title}</h4>
                  {selectedImage.description && (
                    <p className="fs-6 text-white-50 mb-0">{selectedImage.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Call to Action */}
      <section className="py-5 position-relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '400px'
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'rgba(0,0,0,0.2)',
          zIndex: 1
        }}></div>
        
        <div className="container-fluid px-4 position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center text-center text-white">
            <div className="col-lg-8">
              <h2 className="display-4 fw-bold mb-4">Support {program.title}</h2>
              <p className="fs-4 mb-5 text-white-50 lh-lg">
                Your contribution can help us expand this program and reach more
                communities in need. Together, we can create lasting change.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-4 justify-content-center">
                <a
                  href="/get-involved"
                  className="btn btn-light btn-lg rounded-pill px-5 py-3 fw-bold text-primary shadow-lg"
                  style={{ minWidth: '200px' }}
                >
                  <Heart className="me-2" size={20} />
                  Get Involved
                </a>
                <a 
                  href="/contact" 
                  className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg"
                  style={{ minWidth: '200px' }}
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetail;

