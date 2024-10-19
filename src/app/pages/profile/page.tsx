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
import Footer from "@/app/components/layout/Footer";
import EditProfileForm from "@/app/components/ui/UserProfile/EditProfileForm";
import ChangePasswordForm from "@/app/components/ui/UserProfile/ChangePasswordForm";
import toast from "react-hot-toast";
import Link from "next/link";
import { Oval } from "react-loader-spinner";

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={40}
          width={40}
          color="#4E2B63"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#595959"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red font-montserrat font-lg">
        {error}
      </div>
    );
  if (!userData) return;
  <div className="flex justify-center items-center h-screen text-primary font-montserrat text-lg">
    User not found
  </div>;

  return (
    <div className="bg-bg font-roboto">
      <Header />
      <div className="container mx-auto p-4 pt-28">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicInfo userData={userData} />
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-primary">
              Recent Trips
            </h2>
            {userData.trips && userData.trips.length > 0 ? (
              <ul className="space-y-4">
                {userData.trips.slice(0, 3).map((trip) => (
                  <li
                    key={trip.id}
                    className="bg-gray-50 p-4 rounded-md shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">
                        {trip.departureLocation} to {trip.arrivalLocation}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(trip.departureDate).toLocaleDateString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No recent trips.</p>
            )}
            <Link
              href="/pages/tripHistory"
              className="mt-4 inline-block text-primary hover:text-primary-dark hover:underline transition duration-300 ease-in-out"
            >
              View Full Trip History →
            </Link>
          </div>
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
