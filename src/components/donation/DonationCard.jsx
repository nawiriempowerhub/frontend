import React, { useState } from "react";
import { ArrowRight, Check, Heart, Shield, Smartphone } from "lucide-react";
import PaymentModal from "./PaymentModal";
import "./DonationCard.css";

const PRESET_TIERS = [
  {
    amount: 25,
    label: "Ksh 25",
    impact: "Ksh 25 provides exercise books & pencils for a child",
  },
  {
    amount: 50,
    label: "Ksh 50",
    impact: "Ksh 50 provides learning materials for a pupil",
  },
  {
    amount: 100,
    label: "Ksh 100",
    impact: "Ksh 100 provides a student essential stationery pack",
  },
  {
    amount: 250,
    label: "Ksh 250",
    impact: "Ksh 250 supports hygiene essentials & health checkups",
  },
  {
    amount: 500,
    label: "Ksh 500",
    impact: "Ksh 500 provides a community wellness kit for a family",
  },
];

const DonationCard = ({ className = "" }) => {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("once"); // "once" | "monthly"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedPaybill, setCopiedPaybill] = useState(false);

  const activeAmount = isCustom ? (parseInt(customAmount, 10) || 0) : selectedAmount;

  const getImpactStatement = () => {
    if (isCustom) {
      if (activeAmount > 0) {
        return `Ksh ${Number(activeAmount).toLocaleString()} directly powers Nawiri grassroots empowerment programs`;
      }
      return "Every contribution empowers Kenyan grassroots communities";
    }
    const found = PRESET_TIERS.find((t) => t.amount === selectedAmount);
    return found ? found.impact : "Every contribution powers sustainable grassroots change";
  };

  const handleSelectTier = (amount) => {
    setIsCustom(false);
    setSelectedAmount(amount);
  };

  const handleSelectCustom = () => {
    setIsCustom(true);
    if (!customAmount) setCustomAmount("150");
  };

  const handleCopyPaybill = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText("522533");
    setCopiedPaybill(true);
    setTimeout(() => setCopiedPaybill(false), 2000);
  };

  const handleOpenPayment = () => {
    if (activeAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className={`nawiri-donation-card-wrapper ${className}`}>
      <div className="nawiri-donation-card">
        {/* Card Header & Underline */}
        <div className="donation-card-badge">Support Nawiri EmpowerHub</div>
        <div className="donation-card-underline" />

        {/* Dynamic Impact Statement Headline */}
        <h3 className="donation-card-title">{getImpactStatement()}</h3>

        {/* Frequency Selector */}
        <div className="d-flex justify-content-start mb-3">
          <div className="frequency-toggle-wrapper">
            <button
              type="button"
              className={`frequency-btn ${frequency === "once" ? "active" : ""}`}
              onClick={() => setFrequency("once")}
            >
              One-off Gift
            </button>
            <button
              type="button"
              className={`frequency-btn ${frequency === "monthly" ? "active" : ""}`}
              onClick={() => setFrequency("monthly")}
            >
              Give Monthly
            </button>
          </div>
        </div>

        {/* Amount Pill Buttons */}
        <div className="amount-pills-container">
          {PRESET_TIERS.map((tier) => (
            <button
              key={tier.amount}
              type="button"
              className={`amount-pill ${!isCustom && selectedAmount === tier.amount ? "active" : ""}`}
              onClick={() => handleSelectTier(tier.amount)}
            >
              {tier.label}
            </button>
          ))}
          <button
            type="button"
            className={`amount-pill ${isCustom ? "active" : ""}`}
            onClick={handleSelectCustom}
          >
            Any amount
          </button>
        </div>

        {/* Custom Amount Input Field */}
        {isCustom && (
          <div className="custom-amount-wrapper">
            <div className="custom-amount-input-group">
              <span className="custom-amount-prefix">Ksh</span>
              <input
                type="number"
                min="10"
                step="5"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="custom-amount-input"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Main CTA Button */}
        <button
          type="button"
          className="donation-submit-btn"
          onClick={handleOpenPayment}
        >
          <span>
            Donate Ksh {Number(activeAmount || 0).toLocaleString()} {frequency === "monthly" ? "monthly" : "now"}
          </span>
          <ArrowRight size={18} />
        </button>

        {/* Paybill Footnote */}
        <div className="donation-card-footer">
          <div>Instant M-Pesa Prompt or Manual Paybill:</div>
          <span
            className="donation-paybill-badge"
            onClick={handleCopyPaybill}
            title="Click to copy Paybill 522533"
          >
            Paybill: 522533 | Acc: 7964728 {copiedPaybill ? "(Copied!)" : ""}
          </span>
        </div>
      </div>

      {/* Payment STK Push & Methods Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={activeAmount}
        frequency={frequency}
      />
    </div>
  );
};

export default DonationCard;
