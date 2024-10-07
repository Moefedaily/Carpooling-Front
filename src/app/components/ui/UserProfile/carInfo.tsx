import { Car } from "@/Utils/types/cars";
import React from "react";
import { FaCar } from "react-icons/fa";

interface CarInfoProps {
  cars: Car[];
}

const CarInfo = ({ cars }: CarInfoProps) => {
  if (!cars || cars.length === 0) return <p>No car information available.</p>;

  return (
    <div className="space-y-6">
      {cars.map((car, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FaCar className="text-primary mr-3" />
            <span className="font-semibold">
              {car.make} {car.model} ({car.year})
            </span>
          </div>
          <div className="ml-7 space-y-1">
            <p>
              <strong>Color:</strong> {car.color}
            </p>
            <p>
              <strong>License Plate:</strong> {car.licensePlate}
            </p>
            <p>
              <strong>Number of Seats:</strong> {car.numberOfSeats}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarInfo;
