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
import { AxiosError } from "axios";

export const TripService = {
  getAllTrips: async (filters?: TripFilters): Promise<Trip[]> => {
    const response = await api.get<Trip[]>("/trips", { params: filters });
    return response.data;
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
    const response = await api.get<Trip[]>("/trips/popular", {
      params: { limit },
    });
    return response.data;
  },
  getDriverTrips: async (filters?: TripFilters): Promise<Trip[]> => {
    const response = await api.get<Trip[]>("/trips/driver", {
      params: filters,
    });
    return response.data;
  },

  getPassengerTrips: async (filters?: TripFilters): Promise<Trip[]> => {
    const response = await api.get<Trip[]>("/trips/passenger", {
      params: filters,
    });
    return response.data;
  },

  getTripById: async (id: number): Promise<Trip> => {
    const response = await api.get<Trip>(`/trips/${id}`);
    return response.data;
  },

  createTrip: async (tripData: CreateTripData): Promise<Trip> => {
    try {
      const response = await api.post<Trip>("/trips", tripData);
      return response.data;
    } catch (error: AxiosError<any> | any) {
      throw new Error(error.response.data.message || "Failed to create trip");
    }
  },

  updateTrip: async (id: number, tripData: UpdateTripData): Promise<Trip> => {
    const response = await api.patch<Trip>(`/trips/${id}`, tripData);
    return response.data;
  },

  joinTrip: async (tripId: number, numberOfSeats: number) => {
    console.log("Joining trip with data:", { tripId, numberOfSeats });
    try {
      const response = await api.post(`/trips/${tripId}/join`, {
        numberOfSeats,
      });
      console.log("Join trip response:", response.data);
      return response.data;
    } catch (error: AxiosError<any> | any) {
      throw new Error(error.response.message || "Failed to create reservation");
    }
  },

  leaveTrip: async (id: number): Promise<Trip> => {
    const response = await api.post<Trip>(`/trips/${id}/leave`);
    return response.data;
  },

  updateTripStatus: async (id: number, status: TripStatus): Promise<Trip> => {
    const response = await api.patch<Trip>(
      `/trips/${id}/${status.toLowerCase()}`
    );
    return response.data;
  },

  deleteTrip: async (id: number): Promise<void> => {
    await api.delete(`/trips/${id}`);
  },

  getUserTrips: async () => {
    const response = await api.get("/trips/user");
    return response.data;
  },
};
