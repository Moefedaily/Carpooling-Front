import React from "react";
import { TripCardProps } from "@/Utils/types/trip";
import { FaCircle, FaUser } from "react-icons/fa";

const TripCard: React.FC<TripCardProps> = ({ trip, onSelect }) => {
  const handleClick = () => {
    console.log("TripCard clicked", trip.id);
    onSelect(trip.id);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-5 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto cursor-pointer transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-100"
      onClick={handleClick}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center mb-2 sm:mb-0">
          <span className="font-semibold font-roboto text-secondary text-sm sm:text-base">
            {trip.departureLocation}
          </span>
          <FaCircle className="text-primary ml-1 sm:ml-2 text-[6px] sm:text-[8px]" />
        </div>
        <div className="hidden sm:block flex-grow mx-1 border-t border-gray-300 relative">
          <span className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-xs sm:text-sm text-gray-500">
            {trip.departureTime}
          </span>
        </div>
        <div className="flex items-center">
          <FaCircle className="text-primary mr-1 sm:mr-2 text-[6px] sm:text-[8px]" />
          <span className="font-semibold font-roboto text-secondary text-sm sm:text-base">
            {trip.arrivalLocation}
          </span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex items-center mb-2 sm:mb-0">
          <FaUser className="text-primary mr-1 sm:mr-2 text-sm sm:text-base" />
          <span className="text-xs sm:text-sm font-semibold font-montserrat text-secondary">
            {trip.driver.firstName}
          </span>
        </div>
        <span className="font-bold text-base sm:text-lg md:text-xl text-primary">
          {trip.pricePerSeat}€
        </span>
      </div>
    </div>
  );
};

export default TripCard;
