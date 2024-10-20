"use client";
import React, { useState, useEffect } from "react";
import { TripService } from "@/app/services/trip";
import { Trip, TripStatus } from "@/Utils/types/trip";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUser } from "@/app/services/auth";
import toast from "react-hot-toast";

interface ReservationStatus {
  status: "pending" | "cancelled";
}

interface ExtendedTrip extends Trip {
  reservation?: ReservationStatus;
}

const TripHistory: React.FC = () => {
  const [trips, setTrips] = useState<ExtendedTrip[]>([]);
  const [role, setRole] = useState<"passenger" | "driver">("passenger");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const user = getUser();

  const fetchTrips = async () => {
    setIsLoading(true);
    try {
      const fetchedTrips: ExtendedTrip[] =
        role === "passenger"
          ? await TripService.getPassengerTrips()
          : await TripService.getDriverTrips();
      setTrips(fetchedTrips);
    } catch (error) {
      toast.error(`Failed to fetch ${role} trips`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [role]);

  const handleLeaveTrip = async (tripId: number) => {
    try {
      await TripService.leaveTrip(tripId);
      toast.success("Successfully left the trip");
      fetchTrips();
    } catch (error) {
      toast.error("Failed to leave the trip");
    }
  };

  const getStatusColor = (status: TripStatus) => {
    switch (status) {
      case TripStatus.PENDING:
        return "text-yellow-600";
      case TripStatus.CONFIRMED:
        return "text-green-600";
      case TripStatus.START:
        return "text-blue-600";
      case TripStatus.COMPLETED:
        return "text-purple-600";
      case TripStatus.CANCELLED:
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const canLeaveTrip = (trip: ExtendedTrip) => {
    return trip.reservation && trip.reservation.status === "pending";
  };

  const displayTrips =
    role === "driver"
      ? trips.filter(
          (trip) =>
            trip.status === TripStatus.CANCELLED ||
            trip.status === TripStatus.COMPLETED
        )
      : trips;

  return (
    <div className="bg-bg font-roboto">
      <Header />
      <div className="container mx-auto p-4 pt-28">
        <h1 className="text-2xl font-bold mb-6">Trip History</h1>
        <div className="mb-4">
          <button
            onClick={() => setRole("passenger")}
            className={`mr-2 px-4 py-2 rounded ${
              role === "passenger" ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            As Passenger
          </button>
          <button
            onClick={() => setRole("driver")}
            className={`px-4 py-2 rounded ${
              role === "driver" ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            As Driver
          </button>
        </div>
        {isLoading ? (
          <p>Loading trips...</p>
        ) : displayTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayTrips.map((trip) => (
              <div key={trip.id} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">
                  {trip.departureLocation} → {trip.arrivalLocation}
                </h3>
                <p>Date: {new Date(trip.departureDate).toLocaleDateString()}</p>
                <p className={`font-medium ${getStatusColor(trip.status)}`}>
                  Status: {trip.status}
                </p>
                {role === "driver" && trip.car && (
                  <p>
                    Earnings: $
                    {trip.pricePerSeat *
                      (trip.car.numberOfSeats - trip.availableSeats)}
                  </p>
                )}
                {role === "passenger" && canLeaveTrip(trip) && (
                  <button
                    onClick={() => handleLeaveTrip(trip.id)}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Leave Trip
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No trips found.</p>
        )}
        <div className="mt-4">
          {user?.isVerifiedDriver && (
            <Link
              href="/pages/driver/dashboard"
              className="inline-block text-primary hover:underline mr-4"
            >
              Back to Dashboard
            </Link>
          )}
          <Link
            href="/pages/profile"
            className="inline-block text-primary hover:underline"
          >
            Back to Profile
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripHistory;
