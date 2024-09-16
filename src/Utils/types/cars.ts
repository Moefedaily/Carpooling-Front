export interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    numberOfSeats: number;
}

export interface createCarData {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    numberOfSeats: number;
}

export interface updateCarData {
    make?: string;
    model?: string;
    year?: number;
    color?: string;
    licensePlate?: string;
    numberOfSeats?: number;
}