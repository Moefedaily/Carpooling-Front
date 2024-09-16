"use client";
import { TripService } from "@/app/services/trip";
import { Trip } from "@/Utils/types/trip";
import { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaArrowRight, FaDollarSign, FaMapPin } from "react-icons/fa";

const PopularTripsSection = () => {
  const [popularTrips, setPopularTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchPopularTrips = async () => {
      try {
        const trips = await TripService.getPopularTrips(5);
        setPopularTrips(trips);
      } catch (error) {
        console.error("Error fetching popular trips:", error);
      }
    };

    fetchPopularTrips();
  }, []);

  return (
    <div className="  p-20 mb-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-2 font-montserrat text-primary">
        Explore France and its surroundings
      </h2>
      <p className="text-sm font-roboto mb-4 text-gray-700 ">
        These popular destinations have a lot to offer
      </p>
      <div className="flex flex-wrap gap-4">
        {popularTrips.map((trip: Trip) => (
          <div
            key={trip.id}
            className="flex-1 min-w-[200px] bg-white rounded-md px-6 py-4 flex items-center justify-between shadow-lg font-roboto text-button-start"
          >
            <div className="flex items-center">
              <span className="font-medium">{trip.departureLocation}</span>
              <BiChevronRight size={16} className="mx-1 text-gray-400" />
              <span className="font-medium">{trip.arrivalLocation}</span>
            </div>
            <span className="font-bold">{trip.pricePerSeat}€</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTripsSection;
