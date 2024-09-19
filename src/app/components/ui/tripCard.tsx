import React from "react";
import { TripCardProps } from "@/Utils/types/trip";

const TripCard: React.FC<TripCardProps> = ({ trip, onSelect }) => {
  const handleClick = () => {
    console.log("TripCard clicked", trip.id);
    onSelect(trip.id);
  };
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 flex items-center"
      onClick={handleClick}
    >
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
       
      </div>
    </div>
  );
};

export default TripCard;
