import React from "react";
import DonationCard from "../donation/DonationCard";

/**
 * Replaced legacy clunky form with streamlined PayHero Donation Card
 */
const DonationForm = () => {
  return (
    <div className="w-100 d-flex justify-content-center">
      <div style={{ maxWidth: "560px", width: "100%" }}>
        <DonationCard />
      </div>
    </div>
  );
};

export default DonationForm;
