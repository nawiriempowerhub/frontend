import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Calendar, MapPin, Target, X } from "lucide-react";
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
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Loading size="lg" text="Loading program details..." />
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

  if (!program) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <ErrorMessage message="Program not found" />
      </div>
    );
  }

  return (
    <div className="w-100">
      {/* Hero Section */}
      <section className="hero-white text-black section-padding w-100">
        <div className="container-fluid px-3">
          <div className="mb-4">
            <a href="/programs" className="btn btn-outline-primary">
              <ArrowLeft
                style={{ width: "16px", height: "16px" }}
                className="me-2"
              />{" "}
              Back to Programs
            </a>
          </div>
          <div>
            <h2 className="display-4 fw-bold mb-4">{program.title}</h2>
            <p className="fs-4 text-gray-800">{program.description}</p>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="section-padding">
        <div className="container-fluid px-3">
          <div className="row g-5">
            {/* Main Content */}
            <div className="col-12 col-lg-8">
              <div className="prose">
                <h2 className="h3 fw-bold text-dark mb-4">
                  About This Program
                </h2>
                <p className="text-muted mb-4">
                  {program.long_description ||
                    "The Heshima ya Dada Pad Program is a grassroots menstrual health initiative under the Nawiri EmpowerHub umbrella, dedicated to restoring dignity, confidence, and opportunity to girls and women across underserved communities in Kenya. We believe that menstruation should never be a barrier to education, participation, or self-worth. Yet, thousands of girls miss school or drop out entirely due to period poverty, stigma, and lack of access to sanitary products. Heshima ya Dada, meaning “A Girl’s Dignity” in Swahili, was created as a powerful response to this injustice."}
                </p>

                {program.objectives && Array.isArray(program.objectives) && (
                  <div className="mb-4">
                    <h3 className="h4 fw-bold text-dark mb-3">
                      Program Objectives
                    </h3>
                    <ul className="list-group list-group-flush d-flex flex-column gap-2 text-muted">
                      {program.objectives.map((objective, index) => (
                        <li key={index} className="list-group-item">
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* {program.image && (
                  <div className="my-4">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${
                        program.image
                      }`}
                      alt={program.title}
                      className="img-fluid rounded shadow"
                      style={{
                        maxHeight: "400px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                )} */}

                {program.target_group && program.target_group.length > 0 && (
                  <div className="mb-4">
                    <h3 className="h4 fw-bold text-dark mb-3">Target</h3>
                    <ul className="text-muted ps-3">
                      {program.target_group.map((group, index) => (
                        <li key={index}>{group}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-12 col-lg-4 d-flex flex-column gap-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Program Information</h5>
                </div>
                <div className="card-body d-flex flex-column gap-3">
                  {/* {program.location && (
                    <div className="d-flex align-items-center gap-3">
                      <MapPin style={{ width: '20px', height: '20px' }} className="text-primary" />
                      <div>
                        <p className="fw-medium">Location</p>
                        <p className="small text-muted">{program.location}</p>
                      </div> 
                    </div>
                  )}
                   */}
                  {/* {program.participants && (
                    <div className="d-flex align-items-center gap-3">
                      <Users style={{ width: '20px', height: '20px' }} className="text-primary" />
                      <div>
                        <p className="fw-medium">Participants</p>
                        <p className="small text-muted">{program.participants || program.team_members} people</p>
                      </div>
                    </div>
                  )} */}

                  {program.start_date && (
                    <div className="d-flex align-items-center gap-3">
                      <Calendar
                        style={{ width: "20px", height: "20px" }}
                        className="text-primary"
                      />
                      <div>
                        <p className="fw-medium">Start Date</p>
                        <p className="small text-muted">
                          {new Date(program.start_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {program.status && (
                    <div className="d-flex align-items-center gap-3">
                      <Target
                        style={{ width: "20px", height: "20px" }}
                        className="text-primary"
                      />
                      <div>
                        <p className="fw-medium">Status</p>
                        <p className="small text-muted text-capitalize">
                          {program.status}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Get Involved</h5>
                  <p className="card-text text-muted">
                    Support this program and help us create lasting change.
                  </p>
                </div>
                <div className="card-body d-flex flex-column gap-2">
                  <a href="/get-involved" className="btn btn-primary w-100">
                    Volunteer
                  </a>
                  <a href="/contact" className="btn btn-outline-primary w-100">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Gallery */}
      {media.length > 0 && media.some((item) => item.type === "PHOTO") && (
        <section className="section-padding bg-white">
          <div className="container-fluid px-3">
            <h2 className="h3 fw-bold text-dark mb-4 text-center">
              Program Gallery
            </h2>
            <div className="row g-4">
              {media
                .filter((item) => item.type === "PHOTO")
                .map((item) => (
                  <div key={item.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card card-hover">
                      <div className="card-header">
                        <h5 className="card-title fs-6">{item.title}</h5>
                        {item.description && (
                          <p className="card-text text-muted">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="card-body p-0">
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}${
                            item.file_url
                          }`}
                          alt={item.title}
                          className="card-img-top rounded-0 cursor-pointer"
                          style={{ aspectRatio: "16/9", objectFit: "cover" }}
                          onClick={() => openLightbox(item)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="lightboxModalLabel"
          aria-hidden="false"
          onClick={closeLightbox}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div
              className="modal-content bg-transparent border-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header border-0 p-2 position-absolute top-0 end-0">
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Close"
                  onClick={closeLightbox}
                >
                  <X
                    style={{ width: "24px", height: "24px", color: "white" }}
                  />
                </button>
              </div>
              <div className="modal-body p-0">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${
                    selectedImage.url
                  }`}
                  alt={selectedImage.title}
                  className="img-fluid rounded"
                  style={{
                    maxHeight: "80vh",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <div className="text-center mt-3 text-white">
                  <h5 className="mb-1">{selectedImage.title}</h5>
                  {selectedImage.description && (
                    <p className="small">{selectedImage.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="hero-gradient text-white section-padding w-100">
        <div className="container-fluid px-3">
          <div className="text-center">
            <h2 className="h3 fw-bold mb-4">Support {program.title}</h2>
            <p className="fs-5 mb-4 text-gray-100">
              Your contribution can help us expand this program and reach more
              communities in need.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <a
                href="/get-involved"
                className="btn btn-light text-primary hover-bg-gray-100 fw-medium"
              >
                Get Involved
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

export default ProgramDetail;
