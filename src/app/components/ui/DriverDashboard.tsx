"use client";

import React, { useState, useEffect } from "react";
import { TripService } from "@/app/services/trip";
import { Trip, TripStatus, UpdateTripData } from "@/Utils/types/trip";
import Modal from "@/app/components/ui/modal";
import Link from "next/link";
import DriverTripCard from "./DriverTripCard";
import EditTripForm from "./editTripForm";
import toast from "react-hot-toast";

const DriverDashboard: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [stats, setStats] = useState({ totalTrips: 0, totalEarnings: 0 });
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  useEffect(() => {
    const fetchTrips = async () => {
      const fetchedTrips = await TripService.getDriverTrips();
      setTrips(fetchedTrips);

      const totalTrips = fetchedTrips.length;
      const totalEarnings = fetchedTrips.reduce(
        (acc, trip) =>
          acc +
          trip.pricePerSeat * (trip.car.numberOfSeats - trip.availableSeats),
        0
      );

      setStats({ totalTrips, totalEarnings });
    };

    fetchTrips();
  }, []);
  const handleEditTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsEditModalOpen(true);
  };

  const handleUpdateStatus = async (tripId: number, newStatus: TripStatus) => {
    let backRoute;

    switch (newStatus) {
      case TripStatus.CONFIRMED:
        backRoute = "confirm";
        break;
      case TripStatus.CANCELLED:
        backRoute = "cancel";
        break;
      case TripStatus.IN_PROGRESS:
        backRoute = "start";
        break;
      case TripStatus.COMPLETED:
        backRoute = "complete";
        break;
      default:
        console.error(`Unknown status: ${newStatus}`);
        return;
    }

    console.log(
      `Updating status for trip ${tripId} to ${newStatus} via /${backRoute}`
    );
    try {
      const updatedTrip = await TripService.updateTripStatus(tripId, backRoute);
      setTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip.id === updatedTrip.id ? updatedTrip : trip
        )
      );
      toast.success(`Trip status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update trip status:", error);
      toast.error("Failed to update trip status");
    }
  };

  const handleDeleteTrip = async (tripId: number) => {
    try {
      await TripService.deleteTrip(tripId);
      setTrips(trips.filter((t) => t.id !== tripId));
      toast.success("Trip deleted successfully");
    } catch (error) {
      console.error("Failed to delete trip:", error);
      toast.error("Failed to delete trip");
    }
  };

  const handleSaveEdit = async (updatedTrip: UpdateTripData) => {
    try {
      const savedTrip = await TripService.updateTrip(
        selectedTrip!.id,
        updatedTrip
      );
      setTrips(trips.map((t) => (t.id === savedTrip.id ? savedTrip : t)));
      setIsEditModalOpen(false);
      toast.success("Trip updated successfully");
    } catch (error) {
      console.error("Failed to update trip:", error);
      toast.error("Failed to update trip");
    }
  };

  const activeTrips = trips.filter((trip) => {
    const isActive = [
      TripStatus.PENDING,
      TripStatus.CONFIRMED,
      TripStatus.IN_PROGRESS,
    ].includes(trip.status as TripStatus);
    return isActive;
  });

  return (
    <div className="container mx-auto pt-28 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Statistics</h2>
          <p>Total Trips: {stats.totalTrips}</p>
          <p>Total Earnings: ${stats.totalEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Quick Actions</h2>
          <Link
            href="/pages/driver/createTrip"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Create New Trip
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Active and Upcoming Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {activeTrips.map((trip) => (
            <DriverTripCard
              key={trip.id}
              trip={trip}
              onEdit={() => handleEditTrip(trip)}
              onUpdateStatus={(newStatus) =>
                handleUpdateStatus(trip.id, newStatus)
              }
              onDelete={() => handleDeleteTrip(trip.id)}
            />
          ))}
        </div>
      </div>

      <Link
        href="/pages/tripHistory"
        className="bg-secondary text-white px-4 py-2 rounded"
      >
        View History
      </Link>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Trip"
      >
        {selectedTrip && (
          <EditTripForm
            trip={selectedTrip}
            onSave={handleSaveEdit}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default DriverDashboard;
