export interface ReviewRequest {
  bookingCode: string;
  propertyId: string;
  userId: string;
  feedback: string;
  rating: number;
}
