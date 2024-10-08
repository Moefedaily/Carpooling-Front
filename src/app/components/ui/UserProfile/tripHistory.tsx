import { Trip } from "@/Utils/types/trip";
import React from "react";

const TripHistory = ({ trips }: { trips: Trip[] }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Trip History</h3>
      {trips.length > 0 ? (
        <ul>
          {trips.map((trip) => (
            <li key={trip.id} className="mb-2">
              <p>
                <strong>{trip.departureLocation}</strong> to{" "}
                <strong>{trip.arrivalLocation}</strong>
              </p>
              <p>Date: {new Date(trip.departureDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No trips found.</p>
      )}
    </div>
  );
};

export default TripHistory;
