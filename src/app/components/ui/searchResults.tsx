"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TripService } from "@/app/services/trip";
import { Trip } from "@/Utils/types/trip";
import TripCard from "./tripCard";

const sortOptions = [
  { value: "earliest", label: "Earliest departure" },
  { value: "lowest", label: "Lowest price" },
];

const SearchResults: React.FC = () => {
  const searchParams = useSearchParams();
  const departureLocation = searchParams.get("departureLocation");
  const arrivalLocation = searchParams.get("arrivalLocation");
  const departureDate = searchParams.get("departureDate");
  const numberOfPassengers = searchParams.get("numberOfPassengers");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [sortBy, setSortBy] = useState("earliest");
  const [startingTime, setStartingTime] = useState("");
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const { push } = useRouter();

  useEffect(() => {
    const fetchTrips = async () => {
      if (
        departureLocation &&
        arrivalLocation &&
        departureDate &&
        numberOfPassengers
      ) {
        try {
          const results = await TripService.searchTrips(
            departureLocation.toString(),
            arrivalLocation.toString(),
            departureDate.toString(),
            numberOfPassengers.toString()
          );
          setTrips(results);
        } catch (error) {
          console.error("Failed to fetch trips:", error);
        }
      }
    };

    fetchTrips();
  }, [departureLocation, arrivalLocation, departureDate, numberOfPassengers]);

  useEffect(() => {
    sortAndFilterTrips();
  }, [sortBy, startingTime, trips]);

  const sortAndFilterTrips = () => {
    let sorted = [...trips];

    switch (sortBy) {
      case "earliest":
        sorted.sort(
          (a, b) =>
            new Date(a.departureTime).getTime() -
            new Date(b.departureTime).getTime()
        );
        break;
      case "lowest":
        sorted.sort((a, b) => a.pricePerSeat - b.pricePerSeat);
        break;
    }

    if (startingTime) {
      const [hours, minutes] = startingTime.split(":").map(Number);
      const filterTime = hours * 60 + minutes;
      sorted = sorted.filter((trip) => {
        const [tripHours, tripMinutes] = trip.departureTime
          .split(":")
          .map(Number);
        const tripTime = tripHours * 60 + tripMinutes;
        return tripTime >= filterTime;
      });
    }

    setFilteredTrips(sorted);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartingTime(e.target.value);
  };
  const handleTripSelect = (tripId: number) => {
    push(`/pages/trip/details/${tripId}`);
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-3xl">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-secondary font-montserrat">
            Search Results
          </h2>
          <div className="flex items-center">
            <span className="mr-2  text-gray-600 font-roboto text-bold">
              Sort by:
            </span>
            {sortOptions.map((option) => (
              <label
                key={option.value}
                className="inline-flex items-center mr-4 text-base text-secondary font-roboto"
              >
                <input
                  type="radio"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={() => handleSortChange(option.value)}
                  className="form-radio "
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <label className="inline-flex items-center text-base font-roboto text-secondary">
            <span className="mr-2">Starting time:</span>
            <input
              type="time"
              value={startingTime}
              onChange={handleTimeChange}
              className=" text-lg font-roboto text-primary "
            />
          </label>
          <span className="ml-4 text-base text-secondary font-roboto">
            Trips found:{" "}
            <span className="text-lg font-roboto text-primary">
              {filteredTrips.length}
            </span>
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTrips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            onSelect={() => handleTripSelect(trip.id)}
          />
        ))}
      </div>

      {filteredTrips.length > 0 && (
        <div className="mt-6 text-center">
          <button className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition duration-300">
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
