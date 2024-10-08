import { Car } from "./cars";
import { licenseCredentials } from "./license";
import { Trip } from "./trip";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  isEmailConfirmed: boolean;
  isVerifiedDriver: boolean;
  role: {
    id: number;
    name: string;
  };
}

export interface UserUpdate {
  email?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  phoneNumber?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  paymentMethod: string;
  roleId?: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: User & {
    trips: Trip[];
    license: licenseCredentials;
    car: Car[];
  };
}

export interface changePasswordData {
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
}
