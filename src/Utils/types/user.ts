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
