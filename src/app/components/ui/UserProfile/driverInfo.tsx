import { Car } from "@/Utils/types/cars";
import { licenseCredentials } from "@/Utils/types/license";
import React from "react";
import { FaIdCard, FaCar, FaCalendarAlt } from "react-icons/fa";

interface driverProps {
  license: licenseCredentials;
  cars: Car[];
}

const DriverInfo = ({ license, cars }: driverProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Driver Information</h2>

      {license && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">License Information</h3>
          <div className="space-y-2">
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
        </div>
      )}

      {cars && cars.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Vehicle Information</h3>
          {cars.map((car, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <FaCar className="text-primary mr-3" />
                <span>
                  <strong>Car:</strong> {car.make} {car.model} ({car.year})
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: car.color }}
                ></span>
                <span>
                  <strong>Color:</strong> {car.color}
                </span>
              </div>
              <div>
                <strong>License Plate:</strong> {car.licensePlate}
              </div>
              <div>
                <strong>Number of Seats:</strong> {car.numberOfSeats}
              </div>
            </div>
          ))}
        </div>
      )}

      {!license && (!cars || cars.length === 0) && (
        <p className="text-gray-500">No driver information available.</p>
      )}
    </div>
  );
};

export default DriverInfo;
