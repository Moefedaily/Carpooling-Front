"use client";
import { TripService } from "@/app/services/trip";
import { Trip } from "@/Utils/types/trip";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const PopularTripsSection = () => {
  const [popularTrips, setPopularTrips] = useState<Trip[]>([]);
  const router = useRouter();

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

  const handleTripClick = (tripId: number) => {
    router.push(`/pages/trip/details/${tripId}`);
  };

  return (
    <div className="bg-teratery p-20 mb-6 rounded-lg">
      <h2 className="text-xl font-bold text-secondary font-montserrat">
        Explore France and its surroundings
      </h2>
      <p className="font-light mb-6 text-subTitle font-roboto">
        These popular destinations have a lot to offer
      </p>
      <div className="flex flex-wrap lg:flex-nowrap gap-4">
        {popularTrips.map((trip: Trip) => (
          <div
            key={trip.id}
            onClick={() => handleTripClick(trip.id)}
            className="flex-1 min-w-[150px] bg-white rounded-2xl px-6 py-8 flex flex-col lg:flex-row items-center justify-between shadow-lg font-roboto text-primary cursor-pointer transition-all duration-300 hover:shadow-xl hover:bg-gray-50"
          >
            <div className="flex items-center text-center lg:text-left">
              <span className="font-medium pr-3">{trip.departureLocation}</span>
              <FaArrowRight size={16} className="mx-1 text-gray-400" />
              <span className="font-medium pl-2">{trip.arrivalLocation}</span>
            </div>
            <span className="font-bold mt-4 lg:mt-0">{trip.pricePerSeat}€</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTripsSection;
