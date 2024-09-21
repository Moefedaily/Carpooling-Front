import { Reservation } from "@/Utils/types/trip";
import api from "./api";

export const ReservationService = {
  getReservationById: async (id: number): Promise<Reservation> => {
    const response = await api.get(`/reservation/${id}`);
    return response.data;
  },
};
