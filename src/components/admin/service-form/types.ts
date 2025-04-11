
import { Service } from "@/utils/types";

export interface ServiceFormProps {
  service?: Service;
  open: boolean;
  onClose: () => void;
  onSave: (service: Service) => void;
}

export const DEFAULT_SERVICE: Service = {
  id: "",
  name: "",
  description: "",
  icon: "utensils",
  featured: false,
  images: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  promotion: false,
  promotionType: ""
};

export const ICON_OPTIONS = [
  { value: "utensils", label: "Restaurante" },
  { value: "spa", label: "Spa" },
  { value: "pool", label: "Piscina" },
  { value: "concierge-bell", label: "Concierge" },
];
