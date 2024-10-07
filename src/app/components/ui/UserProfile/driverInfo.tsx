import { Car } from "@/Utils/types/cars";
import { licenseCredentials } from "@/Utils/types/license";
import React from "react";
import { FaIdCard, FaCar, FaCalendarAlt } from "react-icons/fa";

interface driverProps {
  onShowLicenseModal: () => void;
  onShowCarModal: () => void;
}

const DriverInfo = ({ onShowLicenseModal, onShowCarModal }: driverProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Driver Information</h2>

      <div className="space-y-4">
        <div
          onClick={onShowLicenseModal}
          className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300"
        >
          <span className="flex items-center">
            <FaIdCard className="mr-2 text-primary" />
            License Information
          </span>
          <span>→</span>
        </div>

        <div
          onClick={onShowCarModal}
          className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300"
        >
          <span className="flex items-center">
            <FaCar className="mr-2 text-primary" />
            Car Information
          </span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
};

export default DriverInfo;
