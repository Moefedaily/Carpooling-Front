import { User } from "@/Utils/types/user";
import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCreditCard,
  FaBirthdayCake,
} from "react-icons/fa";
interface BasicInfoProps {
  userData: User;
}

const BasicInfo = ({ userData }: BasicInfoProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <FaUser className="text-primary mr-3" />
          <span>
            <strong>Name:</strong> {userData.firstName} {userData.lastName}
          </span>
        </div>
        <div className="flex items-center">
          <FaEnvelope className="text-primary mr-3" />
          <span>
            <strong>Email:</strong> {userData.email}
          </span>
        </div>
        <div className="flex items-center">
          <FaPhone className="text-primary mr-3" />
          <span>
            <strong>Phone:</strong> {userData.phoneNumber}
          </span>
        </div>
        <div className="flex items-center">
          <FaBirthdayCake className="text-primary mr-3" />
          <span>
            <strong>Birth Date:</strong>{" "}
            {new Date(userData.birthDate).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t">
        <p>
          <strong>Driver Status:</strong>{" "}
          {userData.isVerifiedDriver
            ? "Verified Driver"
            : "Not a verified driver"}
        </p>
      </div>
    </div>
  );
};

export default BasicInfo;
