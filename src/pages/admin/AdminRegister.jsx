import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Spinner, Badge } from "react-bootstrap";
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  KeyRound,
  ShieldAlert,
  BadgeCheck,
} from "lucide-react";
import api from "../../services/api";

const DEFAULT_ALLOWED_EMAIL = "emarube89@gmail.com";
const ALLOWED_ADMIN_EMAIL = (
  import.meta.env.VITE_ALLOWED_ADMIN_EMAIL || DEFAULT_ALLOWED_EMAIL
).toLowerCase().trim();

const DEFAULT_SECRET = "NAWIRI_ADMIN_SECURE_2026!";
const ADMIN_SECRET = (
  import.meta.env.VITE_ADMIN_REGISTRATION_SECRET || DEFAULT_SECRET
).trim();

const AdminRegister = () => {
  const navigate = useNavigate();

  // Security Gate State
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(ALLOWED_ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handler: Unlock Gate with Master Secret Passkey
  const handleVerifyPasscode = (e) => {
    e.preventDefault();
    setError("");

    if (!passcode || passcode.trim() !== ADMIN_SECRET) {
      setError("Unauthorized access: Invalid master security code. Please enter the correct secret passkey to continue.");
      return;
    }

    setIsUnlocked(true);
    setError("");
  };

  // Handler: Complete Admin Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Re-verify gate condition
    if (!passcode || passcode.trim() !== ADMIN_SECRET) {
      setError("Security session expired or invalid passkey. Please verify your security key.");
      setIsUnlocked(false);
      return;
    }

    // Verify authorized email restriction
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail !== ALLOWED_ADMIN_EMAIL) {
      setError(`Unauthorized registration email. Account creation is strictly restricted to ${ALLOWED_ADMIN_EMAIL}.`);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Register with the backend API
      const response = await api.post("/api/users/register", {
        email: cleanEmail,
        full_name: fullName.trim(),
        password: password,
        role: "ADMIN",
      });

      if (response.data) {
        setSuccess(true);
        // Automatically attempt login with new credentials
        try {
          const loginData = new URLSearchParams();
          loginData.append("username", cleanEmail);
          loginData.append("password", password);

          const loginRes = await api.post("/api/users/login", loginData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          });

          if (loginRes.data && loginRes.data.access_token) {
            localStorage.setItem("authToken", loginRes.data.access_token);
            localStorage.setItem("admin_token", loginRes.data.access_token);
            localStorage.setItem("user_role", "ADMIN");
            setTimeout(() => {
              navigate("/admin/dashboard");
            }, 1000);
            return;
          }
        } catch {
          // If auto-login fails, redirect to login page after 2 seconds
          setTimeout(() => {
            navigate("/admin/login");
          }, 2000);
        }
      }
    } catch (err) {
      console.error("Admin registration error:", err);
      const detail =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Registration failed. An account with this email may already exist.";
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
      {/* Background pattern */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#22c55e 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      <Container style={{ maxWidth: "500px", zIndex: 1 }}>
        <div className="text-center mb-4">
          <Link to="/" className="text-decoration-none d-inline-flex align-items-center gap-2 mb-3">
            <img
              src="/images/nawiri_logo.png"
              alt="Nawiri Logo"
              className="rounded-circle shadow"
              style={{ width: "54px", height: "54px", border: "2px solid #22c55e" }}
            />
          </Link>
          <h2 className="fs-3 fw-bold text-white mb-1">
            {isUnlocked ? "Authorized Admin Registration" : "Admin Security Gateway"}
          </h2>
          <p className="text-white-50 small mb-0">
            {isUnlocked
              ? "Register an authorized administrator for Nawiri EmpowerHub"
              : "Administrative master passkey required to access this portal"}
          </p>
        </div>

        <Card className="border-0 shadow-lg rounded-4 overflow-hidden bg-white">
          <Card.Body className="p-4 p-sm-5">
            {/* Step 1: Security Passcode Gate */}
            {!isUnlocked ? (
              <div>
                <div
                  className="d-flex align-items-center justify-content-center gap-2 mb-4 text-warning fw-semibold small bg-warning-subtle py-2 px-3 rounded-pill mx-auto"
                  style={{ maxWidth: "fit-content" }}
                >
                  <KeyRound size={18} className="text-warning-emphasis" />
                  <span className="text-warning-emphasis">Authorization Gate</span>
                </div>

                <div className="text-center mb-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success-subtle text-success mb-3"
                    style={{ width: "64px", height: "64px" }}
                  >
                    <ShieldAlert size={32} />
                  </div>
                  <h4 className="fs-5 fw-bold text-dark mb-1">Enter Secret Admin Passkey</h4>
                  <p className="text-muted small mb-0">
                    To prevent unauthorized admin account creation, enter the organization master secret code.
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="border-0 small rounded-3 mb-4">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleVerifyPasscode}>
                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-semibold text-muted mb-1">
                      Secret Security Code
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPasscode ? "text" : "password"}
                        placeholder="Enter admin secret passkey..."
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        required
                        autoFocus
                        className="ps-5 pe-5"
                        style={{ height: "48px", borderRadius: "10px" }}
                      />
                      <KeyRound
                        size={18}
                        className="text-muted position-absolute top-50 translate-middle-y"
                        style={{ left: "16px" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasscode(!showPasscode)}
                        className="btn btn-link text-muted position-absolute top-50 translate-middle-y p-0 end-0 me-3"
                        style={{ border: "none", background: "none" }}
                        aria-label="Toggle passcode visibility"
                      >
                        {showPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 btn-primary py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 mb-3"
                    style={{ height: "48px" }}
                  >
                    <ShieldCheck size={18} />
                    <span>Verify Passkey & Proceed</span>
                  </Button>
                </Form>

                <div className="text-center pt-2 d-flex flex-column gap-2">
                  <span className="small text-muted">
                    Already have credentials?{" "}
                    <Link to="/admin/login" className="text-success fw-semibold text-decoration-none">
                      Sign in here
                    </Link>
                  </span>
                  <Link
                    to="/"
                    className="text-muted text-decoration-none small d-inline-flex align-items-center justify-content-center gap-1 hover-text-primary mt-1"
                  >
                    <ArrowLeft size={14} /> Return to Public Website
                  </Link>
                </div>
              </div>
            ) : (
              /* Step 2: Account Registration Form */
              <div>
                <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
                  <div className="d-flex align-items-center gap-2 text-success fw-semibold small bg-success-subtle py-1 px-3 rounded-pill">
                    <BadgeCheck size={16} />
                    <span>Passkey Verified</span>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-muted text-decoration-none p-0 small"
                    onClick={() => {
                      setIsUnlocked(false);
                      setPasscode("");
                    }}
                  >
                    Lock Portal
                  </Button>
                </div>

                <div className="bg-light p-3 rounded-3 mb-4 border border-light-subtle d-flex align-items-center gap-2">
                  <ShieldCheck size={20} className="text-success flex-shrink-0" />
                  <div className="small">
                    <div className="text-muted">Designated Admin Account:</div>
                    <span className="fw-bold text-dark font-monospace">{ALLOWED_ADMIN_EMAIL}</span>
                  </div>
                </div>

                {error && (
                  <Alert variant="danger" className="border-0 small rounded-3 mb-4">
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert variant="success" className="border-0 small rounded-3 mb-4 d-flex align-items-center gap-2">
                    <CheckCircle size={18} />
                    <span>Account created successfully! Redirecting to Dashboard...</span>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-muted mb-1">Full Name</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        placeholder="e.g. Elvis Marube"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        autoFocus
                        className="ps-5"
                        style={{ height: "46px", borderRadius: "10px" }}
                      />
                      <User
                        size={18}
                        className="text-muted position-absolute top-50 translate-middle-y"
                        style={{ left: "16px" }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <Form.Label className="small fw-semibold text-muted mb-0">Email Address</Form.Label>
                      <Badge bg="success" className="fw-normal" style={{ fontSize: "0.7rem" }}>
                        Authorized Only
                      </Badge>
                    </div>
                    <div className="position-relative">
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="ps-5 bg-light"
                        style={{ height: "46px", borderRadius: "10px" }}
                      />
                      <Mail
                        size={18}
                        className="text-muted position-absolute top-50 translate-middle-y"
                        style={{ left: "16px" }}
                      />
                    </div>
                    <Form.Text className="text-muted small">
                      Account creation is restricted to <strong>{ALLOWED_ADMIN_EMAIL}</strong>.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-muted mb-1">Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        className="ps-5 pe-5"
                        style={{ height: "46px", borderRadius: "10px" }}
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

                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-semibold text-muted mb-1">Confirm Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                        className="ps-5"
                        style={{ height: "46px", borderRadius: "10px" }}
                      />
                      <Lock
                        size={18}
                        className="text-muted position-absolute top-50 translate-middle-y"
                        style={{ left: "16px" }}
                      />
                    </div>
                  </Form.Group>

                  <Button
                    type="submit"
                    disabled={loading || success}
                    className="w-100 btn-primary py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 mb-3"
                    style={{ height: "46px" }}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" animation="border" />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <span>Complete Admin Registration</span>
                    )}
                  </Button>
                </Form>

                <div className="text-center pt-2 d-flex flex-column gap-2">
                  <span className="small text-muted">
                    Already registered?{" "}
                    <Link to="/admin/login" className="text-success fw-semibold text-decoration-none">
                      Sign in to Admin Portal
                    </Link>
                  </span>

                  <Link
                    to="/"
                    className="text-muted text-decoration-none small d-inline-flex align-items-center justify-content-center gap-1 hover-text-primary mt-1"
                  >
                    <ArrowLeft size={14} /> Return to Public Website
                  </Link>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminRegister;
