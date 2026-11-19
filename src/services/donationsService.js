import api from "./api";

const getApiBaseUrl = () => {
  let url = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "https://backend-production-df3a.up.railway.app";
  return url.replace(/\/$/, "").replace(/\/api$/, "");
};

/**
 * Initiate an M-Pesa donation via PayHero integration on live Railway backend
 * @param {Object} donationData
 * @param {string} [donationData.donor_name]
 * @param {string} [donationData.email]
 * @param {string} donationData.donor_phone - Required M-Pesa phone number
 * @param {number} donationData.amount - Required numeric amount
 * @param {string} [donationData.message]
 */
export const createDonation = async (donationData) => {
  const API_URL = getApiBaseUrl();

  const payload = {
    amount: parseInt(donationData.amount, 10),
    donor_phone: String(donationData.donor_phone || "").trim(),
  };

  if (donationData.donor_name && donationData.donor_name.trim()) {
    payload.donor_name = donationData.donor_name.trim();
  }

  if (donationData.email && donationData.email.trim()) {
    payload.email = donationData.email.trim();
  }

  if (donationData.message && donationData.message.trim()) {
    payload.message = donationData.message.trim();
  }

  // Old fields like payment_method are omitted per the new PayHero schema
  let response = await fetch(`${API_URL}/api/donations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  // Try /donations if backend mounts it without /api
  if (response.status === 404) {
    const altResponse = await fetch(`${API_URL}/donations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (altResponse.ok || altResponse.status !== 404) {
      response = altResponse;
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || `Failed to initiate donation (status: ${response.status})`);
  }

  return await response.json();
};

/**
 * Check payment status of an initiated donation in real time
 * @param {string} externalRef
 */
export const getDonationStatus = async (externalRef) => {
  const API_URL = getApiBaseUrl();
  let response = await fetch(`${API_URL}/api/donations/status/${externalRef}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404) {
    const altResponse = await fetch(`${API_URL}/donations/status/${externalRef}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (altResponse.ok || altResponse.status !== 404) {
      response = altResponse;
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || "Failed to fetch donation status");
  }

  return await response.json();
};

/**
 * Fetch all donations list in real time (for Admin Dashboard)
 */
export const getDonations = async () => {
  const API_URL = getApiBaseUrl();
  const token = localStorage.getItem("admin_token") || localStorage.getItem("authToken");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let response = await fetch(`${API_URL}/api/donations`, {
    method: "GET",
    headers,
  });

  if (response.status === 404) {
    response = await fetch(`${API_URL}/donations`, {
      method: "GET",
      headers,
    });
  }

  if (!response.ok) {
    return [];
  }

  return await response.json();
};

// Backwards-compatible alias for existing components
export const createMpesaDonation = createDonation;

export default {
  createDonation,
  createMpesaDonation,
  getDonationStatus,
  getDonations,
};
