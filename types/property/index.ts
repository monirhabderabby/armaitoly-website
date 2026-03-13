export interface VillaPrice {
  amount: number;
  currency: string;
  per: string;
}

export interface VillaCapacity {
  baseGuests: number;
  extraGuestFee: number;
  currency: string;
}

export interface VillaMinimumStay {
  months: string;
  nights: number;
}

export interface Villa {
  roomId: string;
  name: string;
  locationType: string;
  location: string;
  price: VillaPrice;
  capacity: VillaCapacity;
  minimumStay: VillaMinimumStay[];
  bedroom: string[];
  description: string;
  amenities: string[];
  foodAndDrinks: string[];
  poolAndWellness: string[];
  bathroom: string[];
  offers: string[];
  cleaningFee: number;
  securityDeposit: number;
  taxPercent: number;
  images: string[];
}

export interface HomePagePropertyResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Villa[];
}
