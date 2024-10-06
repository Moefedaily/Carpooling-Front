import React from "react";

const AccountSettings = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
      <button className="bg-primary text-white px-4 py-2 rounded mb-4">
        Change Password
      </button>
      <button className="bg-secondary text-white px-4 py-2 rounded">
        Edit Profile
      </button>
    </div>
  );
};

export default AccountSettings;
