import { User, UserUpdate } from "@/Utils/types/user";
import api from "./api";
import { getUserId } from "./auth";

export const userService = {
  getUserProfile: async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error("User ID not found");
      }

      const userResponse = await api.get(`/users/${userId}`);
      const userData = userResponse.data;

      const tripsResponse = await api.get(`/trips/user`);
      userData.trips = tripsResponse.data;
      if (userData.isVerifiedDriver) {
        const licenseResponse = await api.get(`/licenses/driver`);
        userData.license = licenseResponse.data;

        const carResponse = await api.get(`/cars/owner`);
        userData.car = carResponse.data;
      }
      return userData;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },
  updateProfile: async (userUpdateData: UserUpdate) => {
    const userId = getUserId();
    if (!userId) {
      throw new Error("User ID not found");
    }
    try {
      const transformedData = {
        ...userUpdateData,
        birthDate: userUpdateData.birthDate
          ? new Date(userUpdateData.birthDate)
          : undefined,
      };

      console.log(`service transformed data`, transformedData);
      const response = await api.patch(`/users/${userId}`, transformedData);
      console.log("Sending update data:", userUpdateData);
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const userId = getUserId();
    console.log(userId);
    if (!userId) {
      throw new Error("User ID not found");
    }
    try {
      const response = await api.post(`/users/${userId}/change-password`, {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },
};
