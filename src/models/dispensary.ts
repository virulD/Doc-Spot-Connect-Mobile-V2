export interface Dispensary {
  id: string;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
  distance: string;
  rating: number;
  isOpen: boolean;
  phone: string;
  services: string[];
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}
