import React from "react";
import Form from "@/app/components/ui/form";
import { UserUpdate } from "@/Utils/types/user";

interface EditProfileFormProps {
  userData: UserUpdate;
  onSave: (data: UserUpdate) => void;
}

const EditProfileForm = ({ userData, onSave }: EditProfileFormProps) => {
  const fields = [
    { name: "firstName", label: "First Name", type: "text", required: false },
    { name: "lastName", label: "Last Name", type: "text", required: false },
    { name: "email", label: "Email", type: "email", required: false },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "tel",
      required: false,
    },
    { name: "birthDate", label: "Birth Date", type: "date", required: false },
  ];

  const handleSubmit = (data: UserUpdate) => {
    const transformedData = {
      ...data,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
    };
    console.log(`transform data`, transformedData);
    onSave(transformedData);
  };

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      submitButtonText="Save Changes"
      defaultValues={userData}
    />
  );
};

export default EditProfileForm;
