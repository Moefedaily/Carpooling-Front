import { Car } from "./cars";
import { User } from "./user";

export enum TripStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  FULL = "FULL",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface Trip {
  id: number;
  departureLocation: string;
  arrivalLocation: string;
  departureDate: string;
  departureTime: string;
  availableSeats: number;
  pricePerSeat: number;
  description?: string;
  status: TripStatus;
  driver: User;
  car: Car;
  passengers: User[];
}

export interface CreateTripData {
  departureLocation: string;
  arrivalLocation: string;
  departureDate: string;
  departureTime: string;
  availableSeats: number;
  pricePerSeat: number;
  carId: number;
  description?: string;
}

export interface UpdateTripData {
  departureLocation?: string;
  arrivalLocation?: string;
  departureDate?: string;
  departureTime?: string;
  availableSeats?: number;
  pricePerSeat?: number;
  description?: string;
  carId?: number;
}

export interface TripFilters {
  status?: TripStatus;
  departureLocation?: string;
  arrivalLocation?: string;
  departureDate?: string;
  minAvailableSeats?: number;
  maxPricePerSeat?: number;
}

export interface SearchData {
  departureLocation: string;
  arrivalLocation: string;
  departureDate: string;
  numberOfPassengers: string;
}
export interface JoinTripData {
  numberOfSeats: number;
  tripId: number;
}
export interface TripCardProps {
  trip: Trip;
  onSelect: (tripId: number) => void;
}

export interface Reservation {
  id: number;
  numberOfSeats: number;
  status: ReservationStatus;
  totalAmount: number;
  trip: Trip;
  passenger: User;
}

export enum ReservationStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}
