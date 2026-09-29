import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Tabs,
  Tab,
  Table,
  Badge,
  Modal,
  Form,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import {
  Image as ImageIcon,
  FileText,
  Calendar,
  Plus,
  Trash2,
  UploadCloud,
  RefreshCw,
  Search,
  ExternalLink,
  Layers,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { mediaService } from "../../services/mediaService";
import { programsService } from "../../services/programsService";
import { eventsService } from "../../services/eventsService";
import { getImageUrl } from "../../utils/imageUrl";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("media");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Data states
  const [mediaList, setMediaList] = useState([]);
  const [programsList, setProgramsList] = useState([]);
  const [eventsList, setEventsList] = useState([]);

  // Search filters
  const [mediaSearch, setMediaSearch] = useState("");
  const [mediaTypeFilter, setMediaTypeFilter] = useState("ALL");
  const [programSearch, setProgramSearch] = useState("");
  const [eventSearch, setEventSearch] = useState("");

  // Feedback notifications
  const [alertInfo, setAlertInfo] = useState({ show: false, message: "", variant: "success" });

  // Modal states
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, type: "", id: null, title: "" });

  // Form states
  const [programForm, setProgramForm] = useState({
    title: "",
    description: "",
    category: "Community Development",
    status: "Active",
  });
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "Nairobi, Kenya",
    capacity: 50,
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  const showAlert = (message, variant = "success") => {
    setAlertInfo({ show: true, message, variant });
    setTimeout(() => {
      setAlertInfo({ show: false, message: "", variant: "success" });
    }, 5000);
  };

  const loadAllData = async () => {
    try {
      setRefreshing(true);
      const [mediaData, programsData, eventsData] = await Promise.all([
        mediaService.getMedia().catch(() => []),
        programsService.getPrograms().catch(() => []),
        eventsService.getEvents().catch(() => []),
      ]);

      setMediaList(Array.isArray(mediaData) ? mediaData : []);
      setProgramsList(Array.isArray(programsData) ? programsData : []);
      setEventsList(Array.isArray(eventsData) ? eventsData : []);
    } catch (err) {
      console.error("Dashboard data load error:", err);
      showAlert("Error loading some dashboard data.", "danger");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Handlers for deleting items
  const handleDeleteItem = async () => {
    const { type, id, title } = deleteConfirm;
    if (!id) return;

    try {
      if (type === "media") {
        await mediaService.deleteMedia(id);
        setMediaList((prev) => prev.filter((m) => m.id !== id));
        showAlert(`Media "${title}" successfully removed.`);
      } else if (type === "program") {
        await programsService.deleteProgram(id);
        setProgramsList((prev) => prev.filter((p) => p.id !== id));
        showAlert(`Program "${title}" successfully removed.`);
      } else if (type === "event") {
        await eventsService.deleteEvent(id);
        setEventsList((prev) => prev.filter((e) => e.id !== id));
        showAlert(`Event "${title}" successfully removed.`);
      }
    } catch (err) {
      console.error(`Failed to delete ${type}:`, err);
      showAlert(err.response?.data?.detail || `Failed to delete ${type}.`, "danger");
    } finally {
      setDeleteConfirm({ show: false, type: "", id: null, title: "" });
    }
  };

  // Handlers for creating new program
  const handleCreateProgram = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const created = await programsService.createProgram(programForm);
      setProgramsList((prev) => [created, ...prev]);
      setShowProgramModal(false);
      setProgramForm({ title: "", description: "", category: "Community Development", status: "Active" });
      showAlert(`Program "${programForm.title}" created successfully!`);
    } catch (err) {
      console.error("Create program error:", err);
      showAlert(err.response?.data?.detail || "Failed to create program.", "danger");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handlers for creating new event
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const created = await eventsService.createEvent(eventForm);
      setEventsList((prev) => [created, ...prev]);
      setShowEventModal(false);
      setEventForm({ title: "", description: "", date: "", location: "Nairobi, Kenya", capacity: 50 });
      showAlert(`Event "${eventForm.title}" created successfully!`);
    } catch (err) {
      console.error("Create event error:", err);
      showAlert(err.response?.data?.detail || "Failed to create event.", "danger");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Filtered lists
  const filteredMedia = mediaList.filter((m) => {
    const matchesSearch =
      (m.title && m.title.toLowerCase().includes(mediaSearch.toLowerCase())) ||
      (m.description && m.description.toLowerCase().includes(mediaSearch.toLowerCase()));
    const matchesType = mediaTypeFilter === "ALL" || m.type === mediaTypeFilter;
    return matchesSearch && matchesType;
  });

  const filteredPrograms = programsList.filter((p) =>
    (p.title && p.title.toLowerCase().includes(programSearch.toLowerCase())) ||
    (p.category && p.category.toLowerCase().includes(programSearch.toLowerCase()))
  );

  const filteredEvents = eventsList.filter((e) =>
    (e.title && e.title.toLowerCase().includes(eventSearch.toLowerCase())) ||
    (e.location && e.location.toLowerCase().includes(eventSearch.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5 min-vh-50">
        <Spinner animation="border" variant="success" size="lg" />
        <span className="mt-3 text-muted fw-semibold">Loading Admin Console...</span>
      </div>
    );
  }

  return (
    <Container className="py-2">
      {/* Top Banner Alert */}
      {alertInfo.show && (
        <Alert 
          variant={alertInfo.variant} 
          onClose={() => setAlertInfo({ show: false, message: "", variant: "success" })} 
          dismissible
          className="shadow-sm rounded-3 d-flex align-items-center gap-2 mb-4"
        >
          {alertInfo.variant === "success" ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
          <span>{alertInfo.message}</span>
        </Alert>
      )}

      {/* Header and Quick Stats */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">Administrative Dashboard</h1>
          <p className="text-muted small mb-0">
            Manage public media assets, programs, community outreaches, and events.
          </p>
        </div>

        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={loadAllData}
            disabled={refreshing}
            className="d-inline-flex align-items-center gap-1 rounded-pill px-3"
          >
            <RefreshCw size={14} className={refreshing ? "spin" : ""} /> Refresh
          </Button>

          <Button
            as={Link}
            to="/admin/media-upload"
            variant="primary"
            size="sm"
            className="d-inline-flex align-items-center gap-1 rounded-pill px-3 shadow-sm"
          >
            <UploadCloud size={16} /> Batch Upload
          </Button>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={4}>
          <Card className="border-0 shadow-sm rounded-4 h-100 p-3 bg-white border-start border-4 border-success">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted small fw-semibold text-uppercase mb-1">Media Files</p>
                <h3 className="fw-bold mb-0 text-dark">{mediaList.length}</h3>
              </div>
              <div className="bg-success-subtle text-success p-3 rounded-circle">
                <ImageIcon size={24} />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={4}>
          <Card className="border-0 shadow-sm rounded-4 h-100 p-3 bg-white border-start border-4 border-primary">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted small fw-semibold text-uppercase mb-1">Active Programs</p>
                <h3 className="fw-bold mb-0 text-dark">{programsList.length}</h3>
              </div>
              <div className="bg-primary-subtle text-primary p-3 rounded-circle">
                <FileText size={24} />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={4}>
          <Card className="border-0 shadow-sm rounded-4 h-100 p-3 bg-white border-start border-4 border-warning">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted small fw-semibold text-uppercase mb-1">Upcoming Events</p>
                <h3 className="fw-bold mb-0 text-dark">{eventsList.length}</h3>
              </div>
              <div className="bg-warning-subtle text-warning p-3 rounded-circle">
                <Calendar size={24} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Tabbed Management Sections */}
      <Card className="border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
        <Card.Header className="bg-white border-bottom p-0">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="px-3 pt-2 border-0 custom-admin-tabs"
          >
            <Tab
              eventKey="media"
              title={
                <span className="d-inline-flex align-items-center gap-2 py-2">
                  <ImageIcon size={16} /> Media Gallery ({mediaList.length})
                </span>
              }
            />
            <Tab
              eventKey="programs"
              title={
                <span className="d-inline-flex align-items-center gap-2 py-2">
                  <FileText size={16} /> Programs ({programsList.length})
                </span>
              }
            />
            <Tab
              eventKey="events"
              title={
                <span className="d-inline-flex align-items-center gap-2 py-2">
                  <Calendar size={16} /> Events ({eventsList.length})
                </span>
              }
            />
          </Tabs>
        </Card.Header>

        <Card.Body className="p-3 p-md-4">
          {/* TAB 1: MEDIA MANAGEMENT */}
          {activeTab === "media" && (
            <div>
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
                <div className="d-flex flex-column flex-sm-row gap-2 flex-grow-1">
                  <InputGroup style={{ maxWidth: "340px" }}>
                    <InputGroup.Text className="bg-light border-end-0">
                      <Search size={16} className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search media by title..."
                      value={mediaSearch}
                      onChange={(e) => setMediaSearch(e.target.value)}
                      className="border-start-0"
                    />
                  </InputGroup>

                  <Form.Select
                    value={mediaTypeFilter}
                    onChange={(e) => setMediaTypeFilter(e.target.value)}
                    style={{ maxWidth: "160px" }}
                  >
                    <option value="ALL">All Types</option>
                    <option value="PHOTO">Photos</option>
                    <option value="VIDEO">Videos</option>
                    <option value="DOCUMENT">Documents</option>
                  </Form.Select>
                </div>

                <div className="d-flex gap-2">
                  <Button
                    as={Link}
                    to="/admin/media-upload"
                    className="btn btn-primary btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1"
                  >
                    <UploadCloud size={16} /> Batch Upload Media
                  </Button>
                </div>
              </div>

              {filteredMedia.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <ImageIcon size={48} className="text-muted mb-2 opacity-50" />
                  <p className="mb-0">No media found matching your filter criteria.</p>
                </div>
              ) : (
                <Row className="g-3">
                  {filteredMedia.map((item) => (
                    <Col key={item.id} xs={12} sm={6} lg={4} xl={3}>
                      <Card className="h-100 card-hover border border-light-subtle shadow-sm overflow-hidden">
                        <div
                          style={{
                            height: "160px",
                            backgroundColor: "#f1f5f9",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          {item.file_url ? (
                            <img
                              src={getImageUrl(item.file_url)}
                              alt={item.title}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                              <ImageIcon size={32} />
                            </div>
                          )}
                          <span
                            className="badge bg-dark bg-opacity-75 text-white position-absolute top-0 start-0 m-2 small"
                          >
                            {item.type || "MEDIA"}
                          </span>
                        </div>
                        <Card.Body className="p-3 d-flex flex-column">
                          <h6 className="fw-bold text-dark mb-1 text-truncate" title={item.title}>
                            {item.title}
                          </h6>
                          <p className="text-muted small mb-3 flex-grow-1 text-truncate" title={item.description}>
                            {item.description || "No description provided."}
                          </p>
                          <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                            <small className="text-muted">
                              {item.created_at ? new Date(item.created_at).toLocaleDateString() : ""}
                            </small>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="p-1 px-2 rounded-pill d-inline-flex align-items-center gap-1"
                              onClick={() =>
                                setDeleteConfirm({
                                  show: true,
                                  type: "media",
                                  id: item.id,
                                  title: item.title,
                                })
                              }
                            >
                              <Trash2 size={14} /> Delete
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          )}

          {/* TAB 2: PROGRAMS MANAGEMENT */}
          {activeTab === "programs" && (
            <div>
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
                <InputGroup style={{ maxWidth: "340px" }}>
                  <InputGroup.Text className="bg-light border-end-0">
                    <Search size={16} className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search programs..."
                    value={programSearch}
                    onChange={(e) => setProgramSearch(e.target.value)}
                    className="border-start-0"
                  />
                </InputGroup>

                <Button
                  variant="primary"
                  className="btn btn-primary btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1"
                  onClick={() => setShowProgramModal(true)}
                >
                  <Plus size={16} /> New Program
                </Button>
              </div>

              {filteredPrograms.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <FileText size={48} className="text-muted mb-2 opacity-50" />
                  <p className="mb-0">No programs found.</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {filteredPrograms.map((p) => (
                    <div 
                      key={p.id} 
                      className="bg-white border rounded-4 p-3 p-md-4 transition-all d-flex flex-column flex-md-row align-items-md-center gap-3 gap-md-4 admin-list-card"
                      style={{ transition: 'all 0.2s ease-in-out', cursor: 'default' }}
                      onMouseEnter={(e) => { e.currentTarget.classList.add('shadow-sm'); e.currentTarget.style.borderColor = '#198754'; }}
                      onMouseLeave={(e) => { e.currentTarget.classList.remove('shadow-sm'); e.currentTarget.style.borderColor = 'var(--bs-border-color)'; }}
                    >
                      {/* Icon Area */}
                      <div className="d-none d-md-flex align-items-center justify-content-center bg-success-subtle text-success rounded-circle flex-shrink-0" style={{ width: '56px', height: '56px' }}>
                        <FileText size={24} />
                      </div>

                      {/* Content Area */}
                      <div className="flex-grow-1 min-w-0">
                        <h5 className="fw-bold text-dark mb-1 text-truncate" title={p.title}>{p.title}</h5>
                        <p className="text-muted small mb-0 text-truncate" style={{ maxWidth: '600px' }} title={p.description}>
                          {p.description || "No description provided."}
                        </p>
                      </div>

                      {/* Metadata Badges */}
                      <div className="d-flex flex-wrap gap-2 flex-shrink-0 align-items-center" style={{ minWidth: '160px' }}>
                        <Badge bg="light" text="dark" className="border px-2 py-1 fw-medium text-start d-inline-flex align-items-center gap-1">
                          <Layers size={12} className="text-muted"/> {p.category || "General"}
                        </Badge>
                        <Badge bg={p.status === "Completed" ? "secondary" : "success"} className="px-2 py-1 fw-medium">
                          {p.status || "Active"}
                        </Badge>
                      </div>

                      {/* Action Buttons */}
                      <div className="d-flex gap-2 flex-shrink-0 ms-md-auto pt-3 pt-md-0 border-top border-md-0 mt-2 mt-md-0">
                        <Button
                          as={Link}
                          to={`/programs/${p.id}`}
                          target="_blank"
                          variant="light"
                          className="rounded-circle p-2 text-primary border d-inline-flex align-items-center justify-content-center hover-scale"
                          style={{ width: '40px', height: '40px', transition: 'all 0.2s' }}
                          title="View Public Page"
                          onMouseEnter={(e) => e.currentTarget.classList.add('bg-primary-subtle')}
                          onMouseLeave={(e) => e.currentTarget.classList.remove('bg-primary-subtle')}
                        >
                          <ExternalLink size={16} />
                        </Button>
                        <Button
                          variant="light"
                          className="rounded-circle p-2 text-danger border d-inline-flex align-items-center justify-content-center hover-scale"
                          style={{ width: '40px', height: '40px', transition: 'all 0.2s' }}
                          onClick={() =>
                            setDeleteConfirm({
                              show: true,
                              type: "program",
                              id: p.id,
                              title: p.title,
                            })
                          }
                          title="Delete Program"
                          onMouseEnter={(e) => e.currentTarget.classList.add('bg-danger-subtle')}
                          onMouseLeave={(e) => e.currentTarget.classList.remove('bg-danger-subtle')}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EVENTS MANAGEMENT */}
          {activeTab === "events" && (
            <div>
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
                <InputGroup style={{ maxWidth: "340px" }}>
                  <InputGroup.Text className="bg-light border-end-0">
                    <Search size={16} className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search events..."
                    value={eventSearch}
                    onChange={(e) => setEventSearch(e.target.value)}
                    className="border-start-0"
                  />
                </InputGroup>

                <Button
                  variant="primary"
                  className="btn btn-primary btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1"
                  onClick={() => setShowEventModal(true)}
                >
                  <Plus size={16} /> New Event
                </Button>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <Calendar size={48} className="text-muted mb-2 opacity-50" />
                  <p className="mb-0">No events found.</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {filteredEvents.map((e) => (
                    <div 
                      key={e.id} 
                      className="bg-white border rounded-4 p-3 p-md-4 transition-all d-flex flex-column flex-md-row align-items-md-center gap-3 gap-md-4 admin-list-card"
                      style={{ transition: 'all 0.2s ease-in-out', cursor: 'default' }}
                      onMouseEnter={(ev) => { ev.currentTarget.classList.add('shadow-sm'); ev.currentTarget.style.borderColor = '#0d6efd'; }}
                      onMouseLeave={(ev) => { ev.currentTarget.classList.remove('shadow-sm'); ev.currentTarget.style.borderColor = 'var(--bs-border-color)'; }}
                    >
                      {/* Icon Area */}
                      <div className="d-none d-md-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle flex-shrink-0" style={{ width: '56px', height: '56px' }}>
                        <Calendar size={24} />
                      </div>

                      {/* Content Area */}
                      <div className="flex-grow-1 min-w-0">
                        <h5 className="fw-bold text-dark mb-1 text-truncate" title={e.title}>{e.title}</h5>
                        <p className="text-muted small mb-0 text-truncate" style={{ maxWidth: '500px' }} title={e.description}>
                          {e.description || "No description provided."}
                        </p>
                      </div>

                      {/* Metadata Badges */}
                      <div className="d-flex flex-wrap gap-2 flex-shrink-0 align-items-center" style={{ minWidth: '220px' }}>
                        <Badge bg="light" text="dark" className="border px-2 py-1 fw-medium text-start">
                          {e.date ? new Date(e.date).toLocaleDateString() : "TBD"}
                        </Badge>
                        <Badge bg="light" text="dark" className="border px-2 py-1 fw-medium text-start">
                          {e.location || "N/A"}
                        </Badge>
                        <Badge bg="primary" className="bg-opacity-75 px-2 py-1 fw-medium text-start">
                          {e.capacity || 0} attendees
                        </Badge>
                      </div>

                      {/* Action Buttons */}
                      <div className="d-flex gap-2 flex-shrink-0 ms-md-auto pt-3 pt-md-0 border-top border-md-0 mt-2 mt-md-0">
                        <Button
                          as={Link}
                          to={`/events/${e.id}`}
                          target="_blank"
                          variant="light"
                          className="rounded-circle p-2 text-primary border d-inline-flex align-items-center justify-content-center hover-scale"
                          style={{ width: '40px', height: '40px', transition: 'all 0.2s' }}
                          title="View Public Page"
                          onMouseEnter={(ev) => ev.currentTarget.classList.add('bg-primary-subtle')}
                          onMouseLeave={(ev) => ev.currentTarget.classList.remove('bg-primary-subtle')}
                        >
                          <ExternalLink size={16} />
                        </Button>
                        <Button
                          variant="light"
                          className="rounded-circle p-2 text-danger border d-inline-flex align-items-center justify-content-center hover-scale"
                          style={{ width: '40px', height: '40px', transition: 'all 0.2s' }}
                          onClick={() =>
                            setDeleteConfirm({
                              show: true,
                              type: "event",
                              id: e.id,
                              title: e.title,
                            })
                          }
                          title="Delete Event"
                          onMouseEnter={(ev) => ev.currentTarget.classList.add('bg-danger-subtle')}
                          onMouseLeave={(ev) => ev.currentTarget.classList.remove('bg-danger-subtle')}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* CREATE PROGRAM MODAL */}
      <Modal show={showProgramModal} onHide={() => setShowProgramModal(false)} centered>
        <Form onSubmit={handleCreateProgram}>
          <Modal.Header closeButton>
            <Modal.Title className="h5 fw-bold">Create New Program</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Program Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Kilimo Kazi Youth Project"
                value={programForm.title}
                onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Category</Form.Label>
              <Form.Select
                value={programForm.category}
                onChange={(e) => setProgramForm({ ...programForm, category: e.target.value })}
              >
                <option value="Community Development">Community Development</option>
                <option value="Youth Empowerment">Youth Empowerment</option>
                <option value="Healthcare & Sanitation">Healthcare & Sanitation</option>
                <option value="Education & Literacy">Education & Literacy</option>
                <option value="Sustainable Agriculture">Sustainable Agriculture</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Overview of the program's objectives and reach..."
                value={programForm.description}
                onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Status</Form.Label>
              <Form.Select
                value={programForm.status}
                onChange={(e) => setProgramForm({ ...programForm, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowProgramModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={formSubmitting}>
              {formSubmitting ? <Spinner size="sm" animation="border" /> : "Create Program"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* CREATE EVENT MODAL */}
      <Modal show={showEventModal} onHide={() => setShowEventModal(false)} centered>
        <Form onSubmit={handleCreateEvent}>
          <Modal.Header closeButton>
            <Modal.Title className="h5 fw-bold">Create Community Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Event Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Clean Water & Wellness Drive"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                required
              />
            </Form.Group>

            <Row className="g-2 mb-3">
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">Event Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">Capacity (People)</Form.Label>
                  <Form.Control
                    type="number"
                    value={eventForm.capacity}
                    onChange={(e) => setEventForm({ ...eventForm, capacity: Number(e.target.value) })}
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Kibera Community Center, Nairobi"
                value={eventForm.location}
                onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Details about activities and registration requirements..."
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowEventModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={formSubmitting}>
              {formSubmitting ? <Spinner size="sm" animation="border" /> : "Publish Event"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        show={deleteConfirm.show}
        onHide={() => setDeleteConfirm({ show: false, type: "", id: null, title: "" })}
        centered
        size="sm"
      >
        <Modal.Body className="p-4 text-center">
          <div className="bg-danger-subtle text-danger rounded-circle p-3 d-inline-flex mb-3">
            <Trash2 size={28} />
          </div>
          <h5 className="fw-bold mb-2">Delete {deleteConfirm.type}?</h5>
          <p className="text-muted small mb-4">
            Are you sure you want to permanently delete <strong>"{deleteConfirm.title}"</strong>? This action cannot be undone.
          </p>
          <div className="d-flex justify-content-center gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setDeleteConfirm({ show: false, type: "", id: null, title: "" })}
            >
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteItem}>
              Yes, Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
