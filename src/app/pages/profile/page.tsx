"use client";

import React, { useState, useEffect } from "react";
import { userService } from "@/app/services/user";
import BasicInfo from "@/app/components/ui/UserProfile/basicInfo";
import TripHistory from "@/app/components/ui/UserProfile/tripHistory";
import DriverInfo from "@/app/components/ui/UserProfile/driverInfo";
import AccountSettings from "@/app/components/ui/UserProfile/accountSettings";
import { UserProfileResponse } from "@/Utils/types/user";

const UserProfile = () => {
  const [userData, setUserData] = useState<UserProfileResponse["data"] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const data = await userService.getUserProfile();
        setUserData(data);
        console.log(JSON.stringify(data.license));
      } catch (err) {
        setError("Failed to load user data");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!userData) return <div className="text-center py-4">User not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BasicInfo userData={userData} />
        <TripHistory trips={userData.trips || []} />
        {userData.isVerifiedDriver && (
          <DriverInfo license={userData.license} cars={userData.car || []} />
        )}
        <AccountSettings userData={userData} />
      </div>
    </div>
  );
};

export default UserProfile;
