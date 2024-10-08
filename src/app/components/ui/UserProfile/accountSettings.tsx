import React from "react";
import { FaUserEdit, FaLock } from "react-icons/fa";

interface AccountSettingsProps {
  onEditProfile: () => void;
  onChangePassword: () => void;
}

const AccountSettings = ({
  onEditProfile,
  onChangePassword,
}: AccountSettingsProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

      <div className="space-y-4">
        <div
          onClick={onEditProfile}
          className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300"
        >
          <span className="flex items-center">
            <FaUserEdit className="mr-2 text-primary" />
            Edit Profile
          </span>
          <span>→</span>
        </div>

        <div
          onClick={onChangePassword}
          className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300"
        >
          <span className="flex items-center">
            <FaLock className="mr-2 text-primary" />
            Change Password
          </span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
