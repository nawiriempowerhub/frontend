import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  ShieldCheck, 
  LayoutDashboard, 
  UploadCloud, 
  ExternalLink, 
  LogOut, 
  Menu, 
  X,
  Layers
} from "lucide-react";

export const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("user_role");
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Management Portal", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Batch Media Upload", path: "/admin/media-upload", icon: UploadCloud },
  ];

  return (
    <header className="bg-dark text-white border-bottom sticky-top" style={{ backgroundColor: "#0f172a !important" }}>
      <div className="container-max px-3">
        <div className="d-flex justify-content-between align-items-center py-2 py-md-3">
          {/* Logo & Portal Identity */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/admin/dashboard" className="d-flex align-items-center gap-2 text-decoration-none">
              <img
                src="/images/nawiri_logo.png"
                alt="Nawiri Logo"
                className="rounded-circle"
                style={{ width: "38px", height: "38px", objectFit: "cover" }}
              />
              <div>
                <span className="fw-bold text-white fs-6 d-block lh-1">Nawiri EmpowerHub</span>
                <span className="small text-success fw-semibold" style={{ fontSize: "0.75rem" }}>Admin Portal</span>
              </div>
            </Link>
            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-1 small d-none d-sm-inline-flex align-items-center gap-1">
              <ShieldCheck size={13} /> Verified
            </span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="d-none d-md-flex align-items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`btn btn-sm d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2 text-decoration-none transition-all ${
                    isActive 
                      ? "btn-success text-white fw-semibold" 
                      : "btn-outline-light border-0 text-white-50 hover-text-white"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions: View Site & Logout */}
          <div className="d-none d-md-flex align-items-center gap-2">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-secondary btn-sm text-white rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              <ExternalLink size={14} /> Public Site
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-danger btn-sm rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="btn btn-outline-secondary text-white d-md-none p-1 rounded-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="d-md-none py-3 border-top border-secondary">
            <div className="d-flex flex-column gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`btn btn-sm text-start d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-decoration-none ${
                      isActive ? "btn-success text-white" : "btn-outline-light border-0 text-white-50"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <hr className="border-secondary my-2" />
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-secondary text-white btn-sm text-start d-flex align-items-center gap-2 px-3 py-2 rounded-3"
              >
                <ExternalLink size={16} /> Public Website
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm text-start d-flex align-items-center gap-2 px-3 py-2 rounded-3"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken") || localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <AdminNavbar />
      <main className="flex-grow-1 w-100 py-4">
        {children}
      </main>
      <footer className="bg-white border-top py-3 text-center text-muted small">
        <div className="container-max px-3">
          Nawiri EmpowerHub Admin Management Console &bull; Internal Use Only
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
