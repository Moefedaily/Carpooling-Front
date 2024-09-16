import { FieldValues, SubmitHandler } from "react-hook-form";

export interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  validate?: (value: any) => boolean | string;
  options?: { value: string; label: string }[];
}

export interface FormProps<T extends FieldValues> {
  fields: FormField[];
  onSubmit: (data: T) => void | Promise<void>;
  submitButtonText: string;
}
