"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { TripService } from "@/app/services/trip";
import { CarService } from "@/app/services/car";
import { FormProps } from "@/Utils/types/form";
import Form from "./form";

const steps = ["Route", "Time", "Car", "Details"];

const CreateTripForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cars, setCars] = useState<{ value: string; label: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const fetchedCars = await CarService.getAllCars();
        setCars(
          fetchedCars.map((car) => ({
            value: car.id.toString(),
            label: `${car.make} ${car.model} (${car.licensePlate})`,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };
    fetchCars();
  }, []);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data: any) => {
    if (currentStep === steps.length - 1) {
      try {
        const formattedData = {
          ...data,
          availableSeats: parseInt(data.availableSeats, 10),
          pricePerSeat: parseFloat(data.pricePerSeat),
          carId: parseInt(data.carId, 10),
        };

        await TripService.createTrip(formattedData);
        router.push("/pages/driver/dashboard");
      } catch (error) {
        console.error("Failed to create trip:", error);
      }
    } else {
      nextStep();
    }
  };

  const stepFields: FormProps<any>[] = [
    // Route step
    {
      fields: [
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
      ],
      onSubmit,
      submitButtonText: "Next",
    },
    // Time step
    {
      fields: [
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
      ],
      onSubmit,
      submitButtonText: "Next",
    },
    // Car step
    {
      fields: [
        {
          name: "carId",
          label: "Select Car",
          type: "select",
          required: true,
          options: cars,
        },
      ],
      onSubmit,
      submitButtonText: "Next",
    },
    // Details step
    {
      fields: [
        {
          name: "availableSeats",
          label: "Available Seats",
          type: "number",
          required: true,
        },
        {
          name: "pricePerSeat",
          label: "Price per Seat",
          type: "number",
          required: true,
        },
        { name: "description", label: "Description", type: "textarea" },
      ],
      onSubmit,
      submitButtonText: "Create Trip",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step Indicator */}
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                index <= currentStep
                  ? "bg-gradient-to-r from-primary to-secondary  text-xl text-teratery text-center font-roboto font-semibold"
                  : "bg-gray-300 text-gray-600 text-xl  text-center font-roboto font-semibold"
              }`}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-base text-secondary font-roboto font-bold">
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Form */}
      <Form {...stepFields[currentStep]} />

      {/* Navigation */}
      {currentStep > 0 && (
        <button
          type="button"
          onClick={prevStep}
          className="w-full px-4 py-2 font-bold my-2  bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
        >
          Previous
        </button>
      )}
    </div>
  );
};

export default CreateTripForm;
