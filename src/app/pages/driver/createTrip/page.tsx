"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CreateTripData } from "@/Utils/types/trip";
import { TripService } from "@/app/services/trip";
import { CarService } from "@/app/services/car";
import Form from "@/app/components/ui/form";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import Footer from "@/app/components/layout/Footer";
import { Car } from "@/Utils/types/cars";

const CreateTrip: React.FC = () => {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const fetchedCars = await CarService.getAllCars();
        setCars(fetchedCars);
      } catch (error) {
        toast.error("Failed to fetch cars");
      }
    };

    fetchCars();
  }, []);

  const handleCreateTrip = async (data: CreateTripData) => {
    try {
      const transformedData = {
        ...data,
        availableSeats: parseInt(data.availableSeats.toString(), 10),
        pricePerSeat: parseFloat(data.pricePerSeat.toString()),
        carId: parseInt(data.carId.toString(), 10),
      };
      await TripService.createTrip(transformedData);
      toast.success("Trip created successfully");
      router.push("/trips/driver");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create trip"
      );
    }
  };

  const fields = [
    {
      name: "departureLocation",
      label: "Departure Location",
      type: "text",
      required: true,
    },
    {
      name: "arrivalLocation",
      label: "Arrival Location",
      type: "text",
      required: true,
    },
    {
      name: "departureDate",
      label: "Departure Date",
      type: "date",
      required: true,
    },
    {
      name: "departureTime",
      label: "Departure Time",
      type: "time",
      required: true,
    },
    {
      name: "availableSeats",
      label: "Available Seats",
      type: "number",
      required: true,
      min: 1,
    },
    {
      name: "pricePerSeat",
      label: "Price per Seat",
      type: "number",
      required: true,
      min: 0.01,
      step: 0.01,
    },
    {
      name: "carId",
      label: "Car",
      type: "select",
      required: true,
      options: cars.map((car) => ({
        value: car.id.toString(),
        label: `${car.make} ${car.model} (${car.licensePlate})`,
      })),
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: false,
    },
  ];

  return (
    <div>
      <Header />
      <Hero title="Create New Trip" image="/login.jpg" />
      <div className="container mx-auto py-12">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Create New Trip
          </h2>
          <Form
            fields={fields}
            onSubmit={handleCreateTrip}
            submitButtonText="Create Trip"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateTrip;
