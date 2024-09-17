import { FormProps } from "@/Utils/types/form";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

function Form<T extends FieldValues>({
  fields,
  onSubmit,
  submitButtonText,
}: FormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  const onSubmitWrapper: SubmitHandler<T> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-primary"
          >
            {field.label}
          </label>
          <div className="mt-2">
            {field.type === "select" ? (
              <select
                id={field.name}
                {...register(field.name as any, {
                  required: field.required && `${field.label} is required`,
                  validate: field.validate,
                })}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                {...register(field.name as any, {
                  required: field.required && `${field.label} is required`,
                  validate: field.validate,
                })}
                type={field.type}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            )}
            {errors[field.name] && (
              <span className="text-red-700 font-bold text-base">
                {errors[field.name]?.message as string}
              </span>
            )}
          </div>
        </div>
      ))}
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-bg bg-gradient-to-r from-primary to-secondary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default Form;
