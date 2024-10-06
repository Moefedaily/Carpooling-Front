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

      const licenseResponse = await api.get(`/licenses/driver`);
      userData.license = licenseResponse.data;

      const carResponse = await api.get(`/cars/owner`);
      userData.car = carResponse.data;

      return userData;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },
};
