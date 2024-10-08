import { licenseCredentials } from "@/Utils/types/license";
import React from "react";
import { FaIdCard, FaCalendarAlt } from "react-icons/fa";

interface licenseInfoProps {
  license: licenseCredentials;
}
const LicenseInfo = ({ license }: licenseInfoProps) => {
  if (!license) return <p>No license information available.</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <FaIdCard className="text-primary mr-3" />
        <span>
          <strong>License Number:</strong> {license.licenseNumber}
        </span>
      </div>
      <div className="flex items-center">
        <FaCalendarAlt className="text-primary mr-3" />
        <span>
          <strong>Expiration Date:</strong>{" "}
          {new Date(license.expirationDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default LicenseInfo;
