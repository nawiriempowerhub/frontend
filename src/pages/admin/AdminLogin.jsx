import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Lock, Mail, Eye, EyeOff, ArrowLeft, ShieldCheck } from "lucide-react";
import api from "../../services/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new URLSearchParams();
      formData.append("username", email.trim());
      formData.append("password", password);

      const response = await api.post("/api/users/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (response.data && response.data.access_token) {
        localStorage.setItem("authToken", response.data.access_token);
        localStorage.setItem("admin_token", response.data.access_token);
        localStorage.setItem("user_role", "ADMIN");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid response from server. Missing access token.");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      const detail =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Login failed. Please check your credentials and try again.";
      setError(typeof detail === "string" ? detail : JSON.stringify(detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center p-3 position-relative"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #14532d 100%)",
      }}
    >
      {/* Background radial pattern */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#22c55e 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          pointerEvents: 'none'
        }}
      />

      <Container style={{ maxWidth: "460px", zIndex: 1 }}>
        <div className="text-center mb-4">
          <Link to="/" className="text-decoration-none d-inline-flex align-items-center gap-2 mb-3">
            <img
              src="/images/nawiri_logo.png"
              alt="Nawiri Logo"
              className="rounded-circle shadow"
              style={{ width: "54px", height: "54px", border: "2px solid #22c55e" }}
            />
          </Link>
          <h2 className="fs-3 fw-bold text-white mb-1">Nawiri Admin Portal</h2>
          <p className="text-white-50 small mb-0">Authorized personnel only</p>
        </div>

        <Card className="border-0 shadow-lg rounded-4 overflow-hidden bg-white">
          <Card.Body className="p-4 p-sm-5">
            <div className="d-flex align-items-center justify-content-center gap-2 mb-4 text-success fw-semibold small bg-success-subtle py-2 px-3 rounded-pill mx-auto" style={{ maxWidth: "fit-content" }}>
              <ShieldCheck size={18} />
              <span>Secure Authentication</span>
            </div>

            {error && (
              <Alert variant="danger" className="border-0 small rounded-3 mb-4">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-muted mb-1">
                  Admin Email / Username
                </Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    placeholder="admin@nawiri.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    className="ps-5"
                    style={{ height: "48px", borderRadius: "10px" }}
                  />
                  <Mail 
                    size={18} 
                    className="text-muted position-absolute top-50 translate-middle-y" 
                    style={{ left: "16px" }}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="small fw-semibold text-muted mb-1">
                  Password
                </Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="ps-5 pe-5"
                    style={{ height: "48px", borderRadius: "10px" }}
                  />
                  <Lock 
                    size={18} 
                    className="text-muted position-absolute top-50 translate-middle-y" 
                    style={{ left: "16px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-link text-muted position-absolute top-50 translate-middle-y p-0 end-0 me-3"
                    style={{ border: "none", background: "none" }}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </Form.Group>

              <Button
                type="submit"
                disabled={loading}
                className="w-100 btn-primary py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 mb-3"
                style={{ height: "48px" }}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" animation="border" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Log In to Dashboard</span>
                )}
              </Button>
            </Form>

            <div className="text-center pt-2 d-flex flex-column gap-2">
              <span className="small text-muted">
                Forgot credentials or need access?{" "}
                <Link to="/admin/register" className="text-success fw-semibold text-decoration-none">
                  Register new Admin
                </Link>
              </span>
              <Link 
                to="/" 
                className="text-muted text-decoration-none small d-inline-flex align-items-center justify-content-center gap-1 hover-text-primary mt-1"
              >
                <ArrowLeft size={14} /> Return to Public Website
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminLogin;
