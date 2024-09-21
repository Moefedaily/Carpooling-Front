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
      className="bg-white rounded-lg shadow-md p-4 max-w-2xl mx-auto cursor-pointer transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-100"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">
            {trip.departureTime}
          </span>
          <span className=" font-semibold font-roboto text-secondary">
            {trip.departureLocation}
          </span>
          <FaCircle className="text-primary ml-2 text-[8px]" />
        </div>
        <div className="flex-grow mx-1 border-t border-gray-300 relative">
          <span className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
            {trip.departureTime}
          </span>
        </div>
        <FaCircle className="text-primary mr-2 text-[8px]" />
        <div className="flex items-center">
          <span className="font-semibold mr-2 font-roboto text-secondary">
            {trip.arrivalLocation}
          </span>
          <span className="ml-2 text-sm text-secondary">
            {trip.departureTime}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FaUser className="text-primary mr-2" />

          <span className="text-sm font-semibold font-montserrat text-secondary">
            {trip.driver.firstName}
          </span>
          <span className="ml-2 text-yellow-500">★ {trip.driver.id}</span>
        </div>
        <span className="font-bold text-lg text-primary">
          {trip.pricePerSeat}€
        </span>
      </div>
    </div>
  );
};

export default TripCard;
