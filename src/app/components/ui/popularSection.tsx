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
        const trips = await TripService.getPopularTrips(3);
        setPopularTrips(trips);
      } catch (error) {
        console.error("Error fetching popular trips:", error);
      }
    };

    fetchPopularTrips();
  }, []);

  return (
    <div className=" bg-teratery p-20 mb-6 rounded-lg">
      <h2 className="text-xl font-bold text-secondary font-montserrat">
        Explore France and its surroundings
      </h2>
      <p className="font-light mb-6 text-subTitle font-roboto ">
        These popular destinations have a lot to offer
      </p>
      <div className="flex flex-wrap gap-4">
        {popularTrips.map((trip: Trip) => (
          <div
            key={trip.id}
            className="flex-1 min-w-[150px] bg-white rounded-2xl px-6 py-8 flex items-center justify-between shadow-lg font-roboto text-primary"
          >
            <div className="flex items-center">
              <span className="font-medium pr-3">{trip.departureLocation}</span>
              <FaArrowRight size={16} className="mx-1 text-gray-400" />
              <span className="font-medium pl-2">{trip.arrivalLocation}</span>
            </div>
            <span className="font-bold">{trip.pricePerSeat}€</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTripsSection;
