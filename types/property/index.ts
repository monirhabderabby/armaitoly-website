export interface VillaPrice {
  amount: number;
  currency: string;
  per: string;
}

type RoomDetails = {
  roomType: string;
  qty: number;
  minPrice: number;
  minStay: number;
  maxStay: number;
  restrictionStrategy: "stayThrough" | string;
  maxPeople?: number;
  maxAdult: number;
  maxChildren: number;
  taxPercentage: number;
  taxPerson: number;
  rackRate: number;
  cleaningFee: number;
  securityDeposit: number;
  sellPriority: number;
  roomSize: number;
  highlightColor: string;
  includeInReports: boolean;
  overbookingProtection: "property" | string;
  blockAfterCheckOutDays: number;
  controlPriority: number;
};

export interface VillaCapacity {
  baseGuests: number;
  extraGuestFee: number;
  currency: string;
}

export interface VillaMinimumStay {
  months: string;
  nights: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
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
  bathroom: string[];
  description: string;
  amenities: string[];
  internet: string[];
  kitchen: string[];
  locationFeatures: string[];
  pets: string[];
  poolAndWellness: string[];
  services?: string[]; // optional — not present on all villas
  offers: string[];
  cleaningFee: number;
  securityDeposit: number;
  taxPercent: number;
  images: {
    url: string;
    alt: string;
  }[];
  roomDetails: RoomDetails;
  _featureCodes?: string[][];
}

export interface HomePagePropertyResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Villa[];
}

export interface SinglePropertyResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Villa;
}

export interface Property {
  propId: string;
  name: string;
  currency: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  latitude: number;
  longitude: number;
  image: string;
}

export interface PropertiesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Property[];
}

export interface PropertyWithRooms extends Omit<Property, "image"> {
  rooms: Villa[];
}

export interface VillasByProperIdResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: PropertyWithRooms;
  meta: Pagination;
}

export interface VillaByFilterResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Villa[];
}
