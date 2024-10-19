"use client";
import React, { useEffect, useState } from "react";
import { Trip, TripFilters, TripStatus } from "@/Utils/types/trip";
import { TripService } from "@/app/services/trip";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import TripCard from "@/app/components/ui/tripCard";
import { Oval } from "react-loader-spinner";

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
  return (
    <div className="bg-bg font-roboto">
      <Header />

      <Hero title="List of Trips" image="/hero-image.jpg" />
      <h1 className="text-3xl font-bold text-center text-primary mb-4 font-montserrat">
        Available Trips
      </h1>
      <div className="mb-4">
        {trips.map((trip: Trip) => (
          <div key={trip.id}>
            <TripCard trip={trip} onSelect={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableTrips;
