
export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
  featured: boolean;
  promotion: boolean;
  promotionType: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string; // String name of icon
  featured: boolean;
  images: string[]; // Added images array
  promotion: boolean;
  promotionType: string;
}

export interface AdminUser {
  username: string;
  password: string;
}
