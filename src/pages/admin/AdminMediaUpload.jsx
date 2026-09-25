import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  ProgressBar,
  Alert,
  Row,
  Col,
  Badge,
  Spinner,
} from "react-bootstrap";
import {
  UploadCloud,
  X,
  FileImage,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  FileText,
  Video,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { mediaService } from "../../services/mediaService";
import { programsService } from "../../services/programsService";

const AdminMediaUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Form states
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [titlePrefix, setTitlePrefix] = useState("Community Media");
  const [mediaType, setMediaType] = useState("PHOTO");
  const [programId, setProgramId] = useState("");
  const [description, setDescription] = useState("");

  // Program choices for tagging
  const [programs, setPrograms] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);

  // Upload progress & feedback
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, message: "", variant: "success" });

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await programsService.getPrograms();
        setPrograms(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load programs for tagging:", err);
      } finally {
        setLoadingPrograms(false);
      }
    };
    fetchPrograms();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setFeedback({ show: true, message: "Please select at least one file to upload.", variant: "warning" });
      return;
    }

    setUploading(true);
    setUploadProgress(10);
    setFeedback({ show: false, message: "", variant: "success" });

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("title_prefix", titlePrefix.trim());
      formData.append("type", mediaType);
      if (description.trim()) {
        formData.append("description", description.trim());
      }
      if (programId) {
        formData.append("program_id", programId);
      }

      setUploadProgress(40);
      const result = await mediaService.uploadBatchMedia(formData);
      setUploadProgress(100);

      const count = Array.isArray(result) ? result.length : selectedFiles.length;
      setFeedback({
        show: true,
        message: `Successfully uploaded ${count} media asset(s)!`,
        variant: "success",
      });

      setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Batch upload error:", err);
      const detail = err.response?.data?.detail || err.message || "Failed to upload files. Please try again.";
      setFeedback({ show: true, message: detail, variant: "danger" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container style={{ maxWidth: "800px" }} className="py-2">
      {/* Header and breadcrumb */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link
            to="/admin/dashboard"
            className="text-decoration-none small text-muted d-inline-flex align-items-center gap-1 mb-1"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="h3 fw-bold text-dark mb-0">Batch Media Uploader</h1>
        </div>

        <Link to="/media" target="_blank" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
          View Public Gallery
        </Link>
      </div>

      {feedback.show && (
        <Alert
          variant={feedback.variant}
          onClose={() => setFeedback({ show: false, message: "", variant: "success" })}
          dismissible
          className="rounded-3 shadow-sm d-flex align-items-center gap-2 mb-4"
        >
          {feedback.variant === "success" ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
          <span>{feedback.message}</span>
        </Alert>
      )}

      <Card className="border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
        <Card.Body className="p-4 p-md-5">
          <Form onSubmit={handleUploadSubmit}>
            {/* Drag & Drop File Select Area */}
            <div
              className="border border-2 border-dashed rounded-4 p-4 p-md-5 text-center mb-4 position-relative"
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#cbd5e1",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.style.backgroundColor = "#ecfdf5";
                e.currentTarget.style.borderColor = "#16a34a";
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.style.backgroundColor = "#f8fafc";
                e.currentTarget.style.borderColor = "#cbd5e1";
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.style.backgroundColor = "#f8fafc";
                e.currentTarget.style.borderColor = "#cbd5e1";
                if (e.dataTransfer.files) {
                  setSelectedFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
                }
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*,video/*,application/pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <div className="bg-success-subtle text-success rounded-circle p-3 d-inline-flex mb-3">
                <UploadCloud size={32} />
              </div>
              <h5 className="fw-bold mb-1 text-dark">Click to browse or drop media files here</h5>
              <p className="text-muted small mb-0">
                Supports JPG, PNG, WebP, MP4 videos, and PDF documents. Multiple files allowed.
              </p>
            </div>

            {/* Selected Files Preview List */}
            {selectedFiles.length > 0 && (
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small fw-bold text-dark">
                    Selected Files ({selectedFiles.length})
                  </span>
                  <Button
                    variant="link"
                    className="p-0 text-danger small text-decoration-none"
                    onClick={() => setSelectedFiles([])}
                  >
                    Clear All
                  </Button>
                </div>

                <div
                  className="border rounded-3 p-2 bg-light overflow-auto"
                  style={{ maxHeight: "220px" }}
                >
                  <Row className="g-2">
                    {selectedFiles.map((file, idx) => (
                      <Col key={idx} xs={12} sm={6}>
                        <div className="d-flex align-items-center justify-content-between p-2 rounded bg-white border">
                          <div className="d-flex align-items-center gap-2 overflow-hidden">
                            <FileImage size={18} className="text-success flex-shrink-0" />
                            <span className="small text-truncate" title={file.name}>
                              {file.name}
                            </span>
                          </div>
                          <div className="d-flex align-items-center gap-2 flex-shrink-0 ms-2">
                            <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                              {(file.size / 1024).toFixed(0)} KB
                            </small>
                            <button
                              type="button"
                              className="btn btn-sm p-0 text-muted hover-text-danger"
                              onClick={() => removeFile(idx)}
                              aria-label="Remove file"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            )}

            {/* Upload Meta Information */}
            <Row className="g-3 mb-3">
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-dark">
                    Batch Title Prefix
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={titlePrefix}
                    onChange={(e) => setTitlePrefix(e.target.value)}
                    placeholder="e.g. Pad Drive 2025"
                    required
                  />
                  <Form.Text className="text-muted small">
                    Appended with #1, #2, etc. for multiple files.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-dark">
                    Media Category
                  </Form.Label>
                  <Form.Select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value)}
                  >
                    <option value="PHOTO">Photo</option>
                    <option value="VIDEO">Video</option>
                    <option value="DOCUMENT">Document</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mb-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-dark">
                    Tag to Specific Program (Optional)
                  </Form.Label>
                  <Form.Select
                    value={programId}
                    onChange={(e) => setProgramId(e.target.value)}
                    disabled={loadingPrograms}
                  >
                    <option value="">-- General / No Specific Program --</option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-dark">
                    Shared Description (Optional)
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description applied across this upload batch..."
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Progress bar during upload */}
            {uploading && (
              <div className="mb-4">
                <div className="d-flex justify-content-between small text-muted mb-1">
                  <span>Uploading assets to server...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <ProgressBar
                  animated
                  variant="success"
                  now={uploadProgress}
                  style={{ height: "8px", borderRadius: "4px" }}
                />
              </div>
            )}

            {/* Submit Action */}
            <div className="d-flex justify-content-end gap-2 pt-2">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/admin/dashboard")}
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={uploading || selectedFiles.length === 0}
                className="btn-primary d-inline-flex align-items-center gap-2 px-4 shadow-sm"
              >
                {uploading ? (
                  <>
                    <Spinner size="sm" animation="border" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud size={18} />
                    <span>Upload {selectedFiles.length > 0 ? `(${selectedFiles.length}) Files` : "Files"}</span>
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminMediaUpload;
