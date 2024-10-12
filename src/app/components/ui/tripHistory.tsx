"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Trip, TripStatus } from "@/Utils/types/trip";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { TripService } from "@/app/services/trip";

const TripHistory: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [role, setRole] = useState<"passenger" | "driver">("passenger");
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrips = async () => {
      const fetchedTrips =
        role === "passenger"
          ? await TripService.getPassengerTrips()
          : await TripService.getDriverTrips();
      setTrips(fetchedTrips);
    };

    const roleParam = searchParams.get("role");
    if (roleParam === "driver") {
      setRole("driver");
    }

    fetchTrips();
  }, [role, searchParams]);

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

  const nonActiveTrips = trips.filter((trip) => {
    const isActive = [TripStatus.CANCELLED, TripStatus.COMPLETED].includes(
      trip.status as TripStatus
    );
    return isActive;
  });

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nonActiveTrips.map((trip) => (
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
            </div>
          ))}
        </div>
        <Link
          href="/pages/driver/dashboard"
          className="mt-4 inline-block text-primary hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default TripHistory;
