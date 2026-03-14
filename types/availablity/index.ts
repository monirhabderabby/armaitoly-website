// types/availability.ts
export interface AvailabilityDate {
  date: string;
  status: "available" | "booked";
  price: number;
  currency: string;
  minimumStay: number;
}

export interface AvailabilitySummary {
  totalDays: number;
  availableDays: number;
  bookedDays: number;
}

export interface AvailabilityData {
  roomId: number;
  startDate: string;
  endDate: string;
  dates: AvailabilityDate[];
  summary: AvailabilitySummary;
}

export interface AvailabilityResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: AvailabilityData;
}

export interface AvailabilityRequestBody {
  startDate: string; // YYYYMMDD
  endDate: string; // YYYYMMDD
}
