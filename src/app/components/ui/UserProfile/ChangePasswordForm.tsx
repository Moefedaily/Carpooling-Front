import React from "react";
import Form from "@/app/components/ui/form";
import { userService } from "@/app/services/user";
import { changePasswordData } from "@/Utils/types/user";

interface ChangePasswordFormProps {
  onChangePassword: () => void;
}

const ChangePasswordForm = ({ onChangePassword }: ChangePasswordFormProps) => {
  const fields = [
    {
      name: "currentPassword",
      label: "Current Password",
      type: "password",
      required: true,
    },
    {
      name: "newPassword",
      label: "New Password",
      type: "password",
      required: true,
    },
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      type: "password",
      required: true,
    },
  ];

  const handleSubmit = async (data: changePasswordData) => {
    if (data.newPassword !== data.confirmPassword) {
      return;
    }

    try {
      await userService.changePassword(data.currentPassword, data.newPassword);
      onChangePassword();
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      submitButtonText="Change Password"
    />
  );
};

export default ChangePasswordForm;
