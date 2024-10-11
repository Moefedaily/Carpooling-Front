import {
  CreateTripData,
  JoinTripData,
  Reservation,
  SearchData,
  Trip,
  TripFilters,
  TripStatus,
  UpdateTripData,
} from "@/Utils/types/trip";
import api from "./api";
import axios, { AxiosError } from "axios";

export const TripService = {
  getAllTrips: async (filters?: TripFilters): Promise<Trip[]> => {
    try {
      const response = await api.get<Trip[]>("/trips", { params: filters });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch trips");
    }
  },

  searchTrips: async (
    departureLocation: string,
    arrivalLocation: string,
    departureDate: string,
    numberOfPassengers: string
  ): Promise<Trip[]> => {
    const response = await api.get<Trip[]>("/trips/search", {
      params: {
        departureLocation,
        arrivalLocation,
        departureDate,
        numberOfPassengers,
      },
    });
    return response.data;
  },

  getPopularTrips: async (limit: number = 5): Promise<Trip[]> => {
    try {
      const response = await api.get<Trip[]>("/trips/popular", {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch popular trips");
    }
  },

  getDriverTrips: async (filters?: TripFilters): Promise<Trip[]> => {
    try {
      const response = await api.get<Trip[]>("/trips/driver", {
        params: filters,
      });
      console.log("driver data ", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch driver trips");
    }
  },

  getPassengerTrips: async (filters?: TripFilters): Promise<Trip[]> => {
    try {
      const response = await api.get<Trip[]>("/trips/passenger", {
        params: filters,
      });
      console.log("passenger data ", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch passenger trips");
    }
  },

  getTripById: async (id: number): Promise<Trip> => {
    try {
      const response = await api.get<Trip>(`/trips/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch trip details");
    }
  },

  createTrip: async (tripData: CreateTripData): Promise<Trip> => {
    try {
      const response = await api.post<Trip>("/trips", tripData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create trip");
    }
  },

  updateTrip: async (id: number, tripData: UpdateTripData): Promise<Trip> => {
    try {
      const response = await api.patch<Trip>(`/trips/${id}`, tripData);
      console.log("update trip data ", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update trip");
    }
  },

  joinTrip: async (
    tripId: number,
    numberOfSeats: number
  ): Promise<{ trip: Trip; reservation: Reservation }> => {
    try {
      const response = await api.post(`/trips/${tripId}/join`, {
        numberOfSeats,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to join trip");
    }
  },

  leaveTrip: async (id: number): Promise<Trip> => {
    try {
      const response = await api.post<Trip>(`/trips/${id}/leave`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to leave trip");
    }
  },

  async updateTripStatus(tripId: number, newStatus: string): Promise<Trip> {
    try {
      const response = await api.patch<Trip>(
        `/trips/${tripId}/${newStatus.toLowerCase()}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data.message || "Failed to update trip status"
        );
      }
      throw error;
    }
  },

  deleteTrip: async (id: number): Promise<void> => {
    try {
      await api.delete(`/trips/${id}`);
    } catch (error) {
      throw new Error("Failed to delete trip");
    }
  },

  getUserTrips: async (): Promise<Trip[]> => {
    try {
      const response = await api.get<Trip[]>("/trips/user");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user trips");
    }
  },

  getLocationSuggestions: async (query: string) => {
    try {
      const response = await axios.get(
        `https://api-adresse.data.gouv.fr/search/?q=${query}&type=municipality`
      );
      return response.data.features.map((feature: any) => ({
        label: feature.properties.label,
        postcode: feature.properties.postcode,
        citycode: feature.properties.citycode,
      }));
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      return [];
    }
  },
};
