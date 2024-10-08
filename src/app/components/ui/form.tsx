import { FormProps } from "@/Utils/types/form";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

function Form<T extends FieldValues>({
  fields,
  onSubmit,
  submitButtonText,
  defaultValues,
}: FormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({ defaultValues });

  const onSubmitWrapper: SubmitHandler<T> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="mb-2">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {field.label}
          </label>
          <div>
            {field.type === "select" ? (
              <select
                id={field.name}
                {...register(field.name as any, {
                  required: field.required && `${field.label} is required`,
                  validate: field.validate,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              />
            )}
            {errors[field.name] && (
              <span className="text-red-500 text-xs mt-1">
                {errors[field.name]?.message as string}
              </span>
            )}
          </div>
        </div>
      ))}
      <div className="mt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default Form;
