import React from "react";
import { TripCardProps } from "@/Utils/types/trip";

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
      <div className="flex-shrink-0 mr-4"></div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="font-bold">{trip.departureTime}</span> -{" "}
            {trip.departureLocation}
          </div>
          <div>
            <span className="font-bold">{trip.arrivalLocation}</span> -{" "}
            {trip.arrivalLocation}
          </div>
        </div>
        <div className="flex items-center">
          <span className="mr-2">{trip.driver.firstName}</span>
          <span className="text-yellow-500">★ {trip.driver.id}</span>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4">
        <span className="font-bold text-lg">{trip.pricePerSeat}€</span>
        <button className="ml-4 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300">
          Book
        </button>
      </div>
    </div>
  );
};

export default TripCard;
