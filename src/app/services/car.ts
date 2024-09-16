import api from "./api";
import { Car, createCarData, updateCarData } from "@/Utils/types/cars";

export const CarService = {
  getAllCars: async (): Promise<Car[]> => {
    const response = await api.get<Car[]>("/cars");
    return response.data;
  },

  getTripById: async (id: number): Promise<Car> => {
    const response = await api.get<Car>(`/cars/${id}`);
    return response.data;
  },

  createTrip: async (carData: createCarData): Promise<Car> => {
    const response = await api.post<Car>("/cars", carData);
    return response.data;
  },

  updateTrip: async (id: number, carData: updateCarData): Promise<Car> => {
    const response = await api.patch<Car>(`/cars/${id}`, carData);
    return response.data;
  },

  deleteTrip: async (id: number): Promise<void> => {
    await api.delete(`/cars/${id}`);
  },
};
