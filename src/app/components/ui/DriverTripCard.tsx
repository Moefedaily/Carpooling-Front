import { Trip, TripStatus } from "@/Utils/types/trip";
import {
  FaCar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

interface DriverTripCardProps {
  trip: Trip;
  onEdit: () => void;
  onUpdateStatus: (newStatus: TripStatus) => void;
  onDelete: () => void;
}

const DriverTripCard: React.FC<DriverTripCardProps> = ({
  trip,
  onEdit,
  onUpdateStatus,
  onDelete,
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateStatus(e.target.value as TripStatus);
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "START":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-purple-100 text-purple-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl text-primary">
          {trip.departureLocation} → {trip.arrivalLocation}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
            trip.status
          )}`}
        >
          {trip.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2 text-secondary" />
          <span>
            {new Date(trip.departureDate).toLocaleDateString()} |{" "}
            {trip.departureTime}
          </span>
        </div>
        <div className="flex items-center">
          <FaUsers className="mr-2 text-secondary" />
          <span>{trip.availableSeats} Seats available</span>
        </div>
        {trip.car && (
          <div className="flex items-center">
            <FaCar className="mr-2 text-secondary" />
            <span>
              {trip.car.make} {trip.car.model}
            </span>
          </div>
        )}
        <div className="flex items-center">
          <FaMapMarkerAlt className="mr-2 text-secondary" />
          <span>{trip.arrivalLocation}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={onEdit}
          className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors duration-300"
        >
          <FaEdit className="mr-2" />
          Edit
        </button>
        <select
          value={trip.status}
          onChange={handleStatusChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {Object.values(TripStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button
          onClick={onDelete}
          className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-opacity-90 transition-colors duration-300"
        >
          <FaTrash className="mr-2" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DriverTripCard;
