import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Smartphone,
  CreditCard,
  Building,
  CheckCircle2,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  Clock
} from "lucide-react";
import { createDonation, getDonationStatus } from "../../services/donationsService";

const PaymentModal = ({
  isOpen,
  onClose,
  amount,
  frequency = "once",
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState("mpesa"); // 'mpesa' | 'paybill' | 'card'
  const [phoneNumber, setPhoneNumber] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState(null);
  const [realPaymentData, setRealPaymentData] = useState(null);
  
  const pollIntervalRef = useRef(null);
  const pollTimeoutRef = useRef(null);

  const clearPolling = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    if (pollTimeoutRef.current) {
      clearTimeout(pollTimeoutRef.current);
      pollTimeoutRef.current = null;
    }
    setPolling(false);
  };

  useEffect(() => {
    return () => clearPolling();
  }, []);

  if (!isOpen) return null;

  const handleCopy = (text = "522533") => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startRealTimePolling = (externalRef) => {
    setPolling(true);
    let attempts = 0;
    const maxAttempts = 25; // 75 seconds total (25 * 3s)

    pollIntervalRef.current = setInterval(async () => {
      attempts += 1;
      try {
        const data = await getDonationStatus(externalRef);
        const status = (data.payment_status || data.status || "").toUpperCase();

        if (status === "SUCCESS" || status === "COMPLETED") {
          clearPolling();
          setLoading(false);
          setRealPaymentData({
            receipt: data.mpesa_receipt || data.receipt_number || data.receipt || externalRef,
            amount: data.amount || amount,
            phone: data.donor_phone || phoneNumber,
            date: data.created_at || new Date().toLocaleString(),
          });
          if (onSuccess) onSuccess(data);
        } else if (status === "FAILED" || status === "CANCELLED") {
          clearPolling();
          setLoading(false);
          setStatusMessage("");
          setError(data.message || "Payment was cancelled or failed on your phone. Please try again.");
        } else {
          setStatusMessage(`Awaiting M-Pesa PIN entry on phone (${Math.max(0, 75 - attempts * 3)}s remaining)...`);
        }
      } catch (err) {
        console.warn("Real-time polling check:", err.message);
      }

      if (attempts >= maxAttempts) {
        clearPolling();
        setLoading(false);
        setStatusMessage("");
        setError("Payment session timed out. If you already entered your PIN, your payment will be reflected shortly, or you can pay directly via Paybill 522533.");
      }
    }, 3000);
  };

  const handleMpesaSubmit = async (e) => {
    e.preventDefault();
    clearPolling();
    setError(null);
    setRealPaymentData(null);
    setStatusMessage("");

    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 9) {
      setError("Please enter a valid M-Pesa phone number (e.g., 0712 345 678).");
      return;
    }

    try {
      setLoading(true);
      setStatusMessage("Connecting to PayHero gateway & sending STK push to your phone...");

      // Real API payload - no dummy data
      const res = await createDonation({
        donor_name: donorName.trim() || undefined,
        email: donorEmail.trim() || undefined,
        donor_phone: cleanPhone,
        amount: parseInt(amount, 10),
        message: donorMessage.trim() || undefined,
      });

      const externalRef = res?.external_ref || res?.reference || res?.externalRef || res?.checkout_request_id || res?.id;

      if (!externalRef) {
        setLoading(false);
        setStatusMessage("");
        setError(res?.detail || res?.message || "Gateway did not return a valid transaction reference. Please try again.");
        return;
      }

      setStatusMessage("STK prompt sent to your phone! Please enter your M-Pesa PIN...");
      startRealTimePolling(externalRef);
    } catch (err) {
      setLoading(false);
      setStatusMessage("");
      setError(
        err.message || "Failed to trigger M-Pesa STK push. Please check your phone number or use Paybill 522533."
      );
    }
  };

  const handleClose = () => {
    clearPolling();
    setError(null);
    setStatusMessage("");
    setRealPaymentData(null);
    setLoading(false);
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(6px)",
        zIndex: 1060,
      }}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-4 shadow-lg w-100 overflow-hidden"
        style={{
          maxWidth: "480px",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          animation: "modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="d-flex align-items-center justify-content-between p-3 px-4 border-bottom bg-light">
          <div>
            <span className="badge bg-success text-white fw-bold text-uppercase me-2" style={{ letterSpacing: "0.5px" }}>
              {frequency === "monthly" ? "Monthly Donation" : "One-Time Donation"}
            </span>
            <span className="fw-bold text-dark fs-5">Ksh {Number(amount).toLocaleString()}</span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-sm btn-light rounded-circle p-1 d-flex align-items-center justify-content-center text-muted"
            style={{ width: "32px", height: "32px" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-auto flex-grow-1">
          {realPaymentData ? (
            /* Real Confirmed Success Screen */
            <div className="text-center py-4">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "72px",
                  height: "72px",
                  backgroundColor: "#ecfdf5",
                  color: "#059669",
                }}
              >
                <CheckCircle2 size={44} />
              </div>
              <h4 className="fw-bold text-dark mb-2">Payment Confirmed!</h4>
              <p className="text-muted small mb-4">
                Your donation of <strong>Ksh {Number(realPaymentData.amount).toLocaleString()}</strong> has been successfully received by Nawiri EmpowerHub.
              </p>
              <div className="p-3 bg-light rounded-3 text-start small mb-4 border">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Receipt / Ref:</span>
                  <span className="fw-bold text-dark font-monospace">{realPaymentData.receipt}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Amount:</span>
                  <span className="fw-semibold text-success">Ksh {Number(realPaymentData.amount).toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Gateway:</span>
                  <span className="fw-semibold text-dark">PayHero M-Pesa</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Status:</span>
                  <span className="badge bg-success">COMPLETED</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="btn btn-success w-100 rounded-pill py-2 fw-semibold"
                style={{ backgroundColor: "#059669" }}
              >
                Done
              </button>
            </div>
          ) : (
            /* Payment Input Content */
            <div>
              {/* Channel Tabs */}
              <div className="d-flex rounded-3 bg-light p-1 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    clearPolling();
                    setActiveTab("mpesa");
                  }}
                  className={`btn btn-sm flex-fill rounded-3 fw-bold d-flex align-items-center justify-content-center gap-1 py-2 ${
                    activeTab === "mpesa" ? "bg-white shadow-sm text-success" : "text-muted"
                  }`}
                >
                  <Smartphone size={16} /> M-Pesa STK
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearPolling();
                    setActiveTab("paybill");
                  }}
                  className={`btn btn-sm flex-fill rounded-3 fw-bold d-flex align-items-center justify-content-center gap-1 py-2 ${
                    activeTab === "paybill" ? "bg-white shadow-sm text-dark" : "text-muted"
                  }`}
                >
                  <Building size={16} /> Paybill Manual
                </button>
                {/* Card Payment tab temporarily commented out
                <button
                  type="button"
                  onClick={() => {
                    clearPolling();
                    setActiveTab("card");
                  }}
                  className={`btn btn-sm flex-fill rounded-3 fw-bold d-flex align-items-center justify-content-center gap-1 py-2 ${
                    activeTab === "card" ? "bg-white shadow-sm text-primary" : "text-muted"
                  }`}
                >
                  <CreditCard size={16} /> Card
                </button>
                */}
              </div>

              {/* Tab 1: Real M-Pesa STK Push */}
              {activeTab === "mpesa" && (
                <form onSubmit={handleMpesaSubmit}>
                  {error && (
                    <div className="alert alert-danger d-flex align-items-start gap-2 py-2 px-3 small rounded-3 mb-3">
                      <AlertCircle size={18} className="flex-shrink-0 mt-1" />
                      <div>{error}</div>
                    </div>
                  )}

                  {statusMessage && (
                    <div className="alert alert-info d-flex align-items-center gap-2 py-2 px-3 small rounded-3 mb-3">
                      <Loader2 size={16} className="animate-spin flex-shrink-0 text-primary" />
                      <div className="text-dark small fw-medium">{statusMessage}</div>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-dark mb-1">
                      M-Pesa Phone Number <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white fw-bold text-muted small">
                        🇰🇪 +254
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="0712 345 678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        disabled={loading || polling}
                        style={{ fontSize: "1rem" }}
                      />
                    </div>
                    <div className="form-text small text-muted">
                      Enter the phone to receive the live M-Pesa STK PIN prompt.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-dark mb-1">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Jane Doe"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      disabled={loading || polling}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-dark mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      placeholder="jane@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      disabled={loading || polling}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold text-dark mb-1">
                      Message / Purpose (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. For youth & education programs"
                      value={donorMessage}
                      onChange={(e) => setDonorMessage(e.target.value)}
                      disabled={loading || polling}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || polling}
                    className="btn btn-success w-100 rounded-pill py-2.5 fw-bold text-white d-flex align-items-center justify-content-center gap-2"
                    style={{
                      backgroundColor: "#059669",
                      borderColor: "#059669",
                      boxShadow: "0 4px 14px rgba(5, 150, 105, 0.35)",
                    }}
                  >
                    {loading || polling ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Waiting for PIN on Phone...
                      </>
                    ) : (
                      <>
                        <Smartphone size={18} />
                        Send STK Push (Ksh {Number(amount).toLocaleString()})
                      </>
                    )}
                  </button>

                  <div className="d-flex align-items-center justify-content-center gap-1 text-muted small mt-3">
                    <ShieldCheck size={14} className="text-success" />
                    <span>Real-time Live Daraja / PayHero Integration</span>
                  </div>
                </form>
              )}

              {/* Tab 2: Manual Paybill */}
              {activeTab === "paybill" && (
                <div>
                  <div className="p-3 rounded-4 mb-3" style={{ backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0" }}>
                    <div className="small fw-bold text-uppercase text-muted mb-1" style={{ letterSpacing: "0.5px" }}>
                      M-Pesa Official Paybill Details
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div>
                        <div className="text-muted small">Business / Paybill:</div>
                        <span className="fs-3 fw-bold text-dark font-monospace">522533</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy("522533")}
                        className="btn btn-sm btn-outline-success rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1"
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copied ? "Copied!" : "Copy Paybill"}</span>
                      </button>
                    </div>
                    <div className="border-top pt-2">
                      <div className="text-muted small">Account Number:</div>
                      <span className="fs-5 fw-bold text-dark font-monospace">7964728</span>
                    </div>
                  </div>

                  <div className="border rounded-3 p-3 mb-3 bg-light">
                    <div className="fw-bold small text-dark mb-2">How to Pay:</div>
                    <ol className="small text-muted mb-0 ps-3 lh-base">
                      <li>Go to <strong>M-Pesa</strong> on your phone</li>
                      <li>Select <strong>Lipa na M-Pesa</strong> &rarr; <strong>Paybill</strong></li>
                      <li>Enter Business Number: <strong className="text-dark">522533</strong></li>
                      <li>Enter Account Number: <strong className="text-dark">7964728</strong></li>
                      <li>Enter Amount: <strong className="text-dark">Ksh {Number(amount).toLocaleString()}</strong></li>
                      <li>Enter your M-Pesa PIN and confirm</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Tab 3: Card / Bank - Temporarily commented out
              activeTab === "card" && (
                <div className="text-center py-3">
                  <div className="mb-3 d-flex justify-content-center gap-2">
                    <span className="badge bg-light text-dark border px-3 py-2 fw-semibold">Visa</span>
                    <span className="badge bg-light text-dark border px-3 py-2 fw-semibold">Mastercard</span>
                  </div>
                  <h6 className="fw-bold text-dark mb-2">Card Payment</h6>
                  <p className="text-muted small mb-4">
                    Donate <strong>Ksh {Number(amount).toLocaleString()}</strong> directly using credit or debit card.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      alert("Connecting to Card Gateway for Ksh " + amount);
                    }}
                    className="btn btn-success w-100 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                    style={{ backgroundColor: "#059669" }}
                  >
                    <CreditCard size={18} />
                    Continue with Card
                  </button>
                </div>
              )*/}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentModal;
