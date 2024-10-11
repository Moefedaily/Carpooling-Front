import React from "react";
import { Trip, UpdateTripData } from "@/Utils/types/trip";
import Form from "@/app/components/ui/form";
import { FormProps } from "@/Utils/types/form";

interface EditTripFormProps {
  trip: Trip;
  onSave: (updatedTrip: UpdateTripData) => void;
  onCancel: () => void;
}

const EditTripForm: React.FC<EditTripFormProps> = ({
  trip,
  onSave,
  onCancel,
}) => {
  const fields: FormProps<UpdateTripData>["fields"] = [
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
    },
    {
      name: "pricePerSeat",
      label: "Price per Seat",
      type: "number",
      required: true,
    },
    { name: "description", label: "Description", type: "text" },
  ];

  const handleSubmit = (data: UpdateTripData) => {
    onSave({ ...data, id: trip.id });
  };

  return (
    <div>
      <Form<UpdateTripData>
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonText="Save Changes"
        defaultValues={{
          departureLocation: trip.departureLocation,
          arrivalLocation: trip.arrivalLocation,
          departureDate: trip.departureDate,
          departureTime: trip.departureTime,
          availableSeats: trip.availableSeats,
          pricePerSeat: trip.pricePerSeat,
          description: trip.description,
        }}
      />
      <button
        onClick={onCancel}
        className="mt-4 w-full px-4 py-2 text-primary border border-primary rounded-md hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Cancel
      </button>
    </div>
  );
};

export default EditTripForm;
