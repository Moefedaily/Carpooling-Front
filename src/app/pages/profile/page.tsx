"use client";

import React, { useState, useEffect } from "react";
import { userService } from "@/app/services/user";
import { User, UserProfileResponse, UserUpdate } from "@/Utils/types/user";
import BasicInfo from "@/app/components/ui/UserProfile/basicInfo";
import TripHistory from "@/app/components/ui/UserProfile/tripHistory";
import DriverInfo from "@/app/components/ui/UserProfile/driverInfo";
import AccountSettings from "@/app/components/ui/UserProfile/accountSettings";
import Modal from "@/app/components/ui/modal";
import CarInfo from "@/app/components/ui/UserProfile/carInfo";
import LicenseInfo from "@/app/components/ui/UserProfile/licenseInfo";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import Footer from "@/app/components/layout/Footer";
import EditProfileForm from "@/app/components/ui/UserProfile/EditProfileForm";
import ChangePasswordForm from "@/app/components/ui/UserProfile/ChangePasswordForm";
import toast from "react-hot-toast";
import Link from "next/link";

const UserProfile = () => {
  const [userData, setUserData] = useState<UserProfileResponse["data"] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showCarModal, setShowCarModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [editableUserData, setEditableUserData] = useState<UserUpdate | null>(
    null
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const data = await userService.getUserProfile();
        setUserData(data);
        setEditableUserData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          birthDate: new Date(data.birthDate),
        });
      } catch (err) {
        setError("Failed to load user data");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async (updatedData: UserUpdate) => {
    try {
      const result = await userService.updateProfile(updatedData);

      const updatedEditableData = {
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        phoneNumber: result.phoneNumber,
        birthDate: result.birthDate,
      };

      setEditableUserData(updatedEditableData);
      setUserData((prevData) => ({ ...prevData!, ...updatedEditableData }));

      setShowEditProfileModal(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };
  const handleChangePassword = async () => {
    setShowChangePasswordModal(false);
    toast.success("Password changed successfully");
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!userData) return <div className="text-center py-4">User not found</div>;

  return (
    <div className="bg-bg font-roboto">
      <Header />
      <Hero
        title="Profile"
        image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicInfo userData={userData} />
          <TripHistory trips={userData.trips || []} />
          {userData.isVerifiedDriver && (
            <DriverInfo
              onShowLicenseModal={() => setShowLicenseModal(true)}
              onShowCarModal={() => setShowCarModal(true)}
            />
          )}
          <AccountSettings
            onEditProfile={() => setShowEditProfileModal(true)}
            onChangePassword={() => setShowChangePasswordModal(true)}
          />
          {userData.isVerifiedDriver && (
            <div>
              <h2 className="text-xl font-bold mb-2">Driver Dashboard</h2>
              <Link
                href="/pages/driver/dashboard"
                className="text-primary hover:underline"
              >
                Go to Driver Dashboard
              </Link>
            </div>
          )}
        </div>

        <Modal
          isOpen={showLicenseModal}
          onClose={() => setShowLicenseModal(false)}
          title="License Information"
        >
          <LicenseInfo license={userData.license} />
        </Modal>

        <Modal
          isOpen={showCarModal}
          onClose={() => setShowCarModal(false)}
          title="Car Information"
        >
          <CarInfo cars={userData.car} />
        </Modal>

        <Modal
          isOpen={showEditProfileModal}
          onClose={() => setShowEditProfileModal(false)}
          title="Edit Profile"
        >
          <EditProfileForm
            userData={editableUserData ?? {}}
            onSave={handleUpdateProfile}
          />
        </Modal>

        <Modal
          isOpen={showChangePasswordModal}
          onClose={() => setShowChangePasswordModal(false)}
          title="Change Password"
        >
          <ChangePasswordForm onChangePassword={handleChangePassword} />
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
