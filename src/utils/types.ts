
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
  promotion?: boolean;
  promotionType?: string;
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
  promotion?: boolean;
  promotionType?: string;
}

export interface AdminUser {
  username: string;
  password: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  message?: string;
  room_id?: string;
  room_name: string;
  price: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}
