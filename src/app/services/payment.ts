import api from "./api";

export const PaymentService = {
    async initiatePayment(reservationId: number) {
      const response = await api.post('/payments/initiate', { reservationId });
      return response.data;
    },
  };