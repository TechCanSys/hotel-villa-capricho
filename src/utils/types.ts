
export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
  featured: boolean;
  created_at?: string;
  updated_at?: string;
  promotion?: boolean;      // Make optional if not always present
  promotionType?: string;   // Make optional if not always present
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  images: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
  promotion?: boolean;      // Make optional if not always present
  promotionType?: string;  // Make optional if not always present
}

export interface AdminUser {
  username: string;
  password: string;
}
