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
    <form
      onSubmit={handleSubmit(onSubmitWrapper)}
      className="space-y-4 sm:space-y-6"
    >
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-bold text-primary sm:text-base"
          >
            {field.label}
          </label>
          <div className="mt-1 sm:mt-2">
            {field.type === "select" ? (
              <select
                id={field.name}
                {...register(field.name as any, {
                  required: field.required && `${field.label} is required`,
                  validate: field.validate,
                })}
                className="block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-sm sm:text-base"
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
                className="block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-sm sm:text-base"
              />
            )}
            {errors[field.name] && (
              <span className="text-red-700 font-bold text-xs sm:text-sm mt-1">
                {errors[field.name]?.message as string}
              </span>
            )}
          </div>
        </div>
      ))}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full px-4 py-2 sm:py-3 font-bold text-bg bg-gradient-to-r from-primary to-secondary rounded-md hover:bg-secondary focus:ring-secondary transition-colors text-sm sm:text-base"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default Form;
