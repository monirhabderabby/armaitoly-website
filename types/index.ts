export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FAQResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: FAQ[];
}
