import api from "./api";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const createMpesaDonation = async (formData) => {
  const payload = {
    amount: parseInt(formData.amount),           // Ensure it's an integer
    donor_phone: formData.donor_phone.trim(),          // Only this key, and clean it
  };

 const response = await fetch(`${API_BASE_URL}/api/stk_push`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "STK push failed");
  }

  return await response.json();
};

export const createDonation = async (donationData) => {
  const response = await api.post('/api/donations', donationData);
  return response.data;
};