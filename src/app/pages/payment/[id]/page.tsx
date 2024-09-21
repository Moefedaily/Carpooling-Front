"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PaymentService } from "@/app/services/payment";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { Oval } from "react-loader-spinner";
import {
  CardElement,
  useElements,
  useStripe,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReservationService } from "@/app/services/reservation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const PaymentPage = () => {
  const params = useParams();
  const { push } = useRouter();
  const reservationId = params.id as string;
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const data = await ReservationService.getReservationById(
          Number(reservationId)
        );
        setReservation(data);
      } catch (err) {
        setError("Failed to load reservation details");
      } finally {
        setLoading(false);
      }
    };
    fetchReservationDetails();
  }, [reservationId]);

  const handlePayment = async () => {
    if (!stripe || !elements || !reservation) {
      return;
    }

    try {
      setPaymentStatus("processing");
      const { clientSecret } = await PaymentService.initiatePayment(
        Number(reservationId)
      );

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            address: {
              postal_code: "12345",
            },
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      setPaymentStatus("success");
      push("/payment-success");
    } catch (err) {
      console.error("Error in handlePayment:", err);
      setError(err instanceof Error ? err.message : "Payment failed");
      setPaymentStatus("error");
    }
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

  if (!reservation)
    return (
      <div className="flex justify-center items-center h-screen text-primary font-montserrat font-lg">
        Reservation not found
      </div>
    );

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Complete Your Payment
          </h2>
          <div className="mb-6">
            <p className="text-gray-600">Reservation ID: {reservationId}</p>
            <p className="text-gray-600">
              Total Amount: {reservation.totalAmount} €
            </p>
          </div>
          <div className="mb-6">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                  },
                },
              }}
            />
          </div>
          <button
            className="w-full bg-primary text-white py-3 px-4 rounded-full font-bold hover:bg-opacity-90 transition duration-300"
            onClick={handlePayment}
            disabled={paymentStatus === "processing"}
          >
            {paymentStatus === "processing" ? "Processing..." : "Pay Now"}
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const PaymentPageWithStripe = () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);

export default PaymentPageWithStripe;
