export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  experience: string;
  rating: number;
  availableSlots: string[];
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}
