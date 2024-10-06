import { User } from "@/Utils/types/user";
import React from "react";

const BasicInfo = ({ userData }: { userData: User }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
      <p>
        <strong>Name:</strong> {userData.firstName} {userData.lastName}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
      <p>
        <strong>Phone:</strong> {userData.phoneNumber || "Not provided"}
      </p>
      <p>
        <strong>Role:</strong> {userData.role.name}
      </p>
    </div>
  );
};

export default BasicInfo;
