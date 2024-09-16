import React, { useEffect, useState } from "react";
import { Trip, TripFilters, TripStatus } from "@/Utils/types/trip";
import { TripService } from "@/app/services/trip";

const AvailableTrips: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const filters: TripFilters = {
          status: TripStatus.PENDING,
        };
        const fetchedTrips = await TripService.getAllTrips(filters);
        setTrips(fetchedTrips);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch trips");
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) return <div>Loading trips...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Available Trips</h2>
      {trips.length === 0}
    </div>
  );
};

export default AvailableTrips;
