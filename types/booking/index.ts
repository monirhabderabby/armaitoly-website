interface BookingGuest {
  firstName: string;
  lastName: string;
  email: string;
}

export interface BookingPayment {
  price: number;
  deposit: number;
  currency: string;
}

export interface BookingData {
  bookId: number;
  roomId: string;
  firstNight: string;
  lastNight: string;
  nights: number;
  status: string;
  statusLabel: string;
  guest: BookingGuest;
  payment: BookingPayment;
  message: string;
}

export interface CreateBookingResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: BookingData;
}
