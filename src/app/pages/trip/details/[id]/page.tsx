"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { TripService } from "@/app/services/trip";
import { conversationService } from "@/app/services/conversation";
import { Trip } from "@/Utils/types/trip";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import {
  FaMapMarkerAlt,
  FaInfoCircle,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import { format, parseISO } from "date-fns";
import MessageModal from "@/app/components/ui/messagesModal";
import { isAuthenticated, getUserId } from "@/app/services/auth";
import { Conversation } from "@/Utils/types/conversation";

const TripDetailsPage = () => {
  const params = useParams();
  const { push } = useRouter();
  const id = params.id as string;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seats, setSeats] = useState(1);
  const [reservationStatus, setReservationStatus] = useState<
    "idle" | "processing" | "error"
  >("idle");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const data = await TripService.getTripById(Number(id));
        setTrip(data);
      } catch (err) {
        setError("Failed to load trip details");
      } finally {
        setLoading(false);
      }
    };
    fetchTripDetails();
  }, [id]);

  const handleMessageDriver = async () => {
    if (!isAuthenticated()) {
      push("/login?redirect=" + encodeURIComponent(window.location.pathname));
      return;
    }

    try {
      const userId = getUserId();
      if (!userId) throw new Error("User ID not found");

      const conversationData = await conversationService.findConversation(
        Number(id),
        userId
      );
      setConversation(conversationData.data);
      setIsMessageModalOpen(true);
    } catch (err) {
      console.error("Error handling conversation:", err);
      setError("Failed to open conversation");
    }
  };
  const handleReserve = async () => {
    if (!isAuthenticated()) {
      push("/login?redirect=" + encodeURIComponent(window.location.pathname));
      return;
    }

    try {
      setReservationStatus("processing");
      const response = await TripService.joinTrip(Number(id), seats);
      if (!response || !response.reservation || !response.reservation.id) {
        throw new Error(
          "Failed to create reservation: No reservation ID returned"
        );
      }
      push(`/pages/payment/${response.reservation.id}`);
    } catch (err) {
      console.error("Error in handleReserve:", err);
      setError(
        err instanceof Error ? err.message : "Failed to create reservation"
      );
      setReservationStatus("error");
    } finally {
      setReservationStatus("idle");
    }
  };

  const generateSeatOptions = (availableSeats: number) => {
    const options = [];
    for (let i = 1; i <= availableSeats; i++) {
      options.push(
        <option key={i} value={i}>
          {i} seat{i > 1 ? "s" : ""}
        </option>
      );
    }
    return options;
  };
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "EEEE d MMMM");
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

  if (!trip)
    return (
      <div className="flex justify-center items-center h-screen text-primary font-montserrat font-lg">
        Trip not found
      </div>
    );

  return (
    <div>
      <Header />
      <div className="container mx-auto pt-28 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          {formatDate(trip.departureDate)}
        </h2>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="relative pl-16">
              <div className="absolute left-12 top-2 bottom-2 w-0.5 bg-gray-300"></div>
              <div className="mb-16 relative">
                <div className="absolute left-[-5.5rem] top-1 text-sm text-gray-600 w-16 text-right">
                  {trip.departureTime}
                </div>
                <div className="absolute -left-[1.55rem] -top-[1rem] bg-white rounded-full">
                  <FaMapMarkerAlt className="text-primary text-xl" />
                </div>
                <div className="text-base font-roboto text-secondary">
                  {trip.departureLocation}
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-[-5.5rem] top-1 text-sm text-gray-600 w-16 text-right">
                  {trip.departureTime}
                </div>
                <div className="absolute -left-[1.6rem] top-[1.2rem] bg-white rounded-full">
                  <FaMapMarkerAlt className="text-primary text-xl" />
                </div>
                <div className="text-base font-roboto text-secondary">
                  {trip.arrivalLocation}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-2">
              <FaInfoCircle className="text-primary mr-3 text-lg" />
              <div className="font-bold text-lg font-montserrat text-secondary">
                Description
              </div>
            </div>
            <p className="ml-8 text-gray-600 text-sm">
              {trip.description || "No description available."}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaUser className="text-primary mr-2" />
                <span className="font-bold text-lg font-montserrat text-secondary">
                  {trip.driver.firstName} {trip.driver.lastName}
                </span>
              </div>
              <button
                onClick={handleMessageDriver}
                className="flex items-center justify-center bg-secondary text-white py-2 px-4 rounded-full font-bold hover:bg-opacity-90 transition duration-300"
              >
                <FaEnvelope className="mr-2" />
                Message Driver
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-600">Total price for one passenger</div>
              <div className="font-bold text-lg text-primary font-montserrat">
                {trip.pricePerSeat} €
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <label
                htmlFor="seats-select"
                className="font-bold text-lg font-montserrat text-secondary"
              >
                Number of seats:
              </label>
              <select
                id="seats-select"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="border rounded p-2 text-primary font-semibold"
              >
                {generateSeatOptions(trip.availableSeats)}
              </select>
            </div>
            <div className="font-bold text-right mb-4 text-lg text-gray-900 font-montserrat">
              Total: {trip.pricePerSeat * seats} €
            </div>
            <button
              className="w-full bg-primary text-white py-3 px-4 rounded-full font-bold hover:bg-opacity-90 transition duration-300"
              onClick={handleReserve}
              disabled={
                trip.availableSeats === 0 || reservationStatus === "processing"
              }
            >
              {trip.availableSeats > 0
                ? reservationStatus === "processing"
                  ? "Processing..."
                  : "Reserve"
                : "Fully Booked"}
            </button>
          </div>
        </div>
        {isMessageModalOpen && (
          <MessageModal
            isOpen={isMessageModalOpen}
            onClose={() => setIsMessageModalOpen(false)}
            conversation={conversation}
            tripId={Number(id)}
            currentUserId={getUserId()}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TripDetailsPage;
