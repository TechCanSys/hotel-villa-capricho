
import React, { useState } from "react";
import { Service } from "@/utils/types";
import AdminServiceForm from "@/components/AdminServiceForm";

interface ServiceFormManagerProps {
  onSave: (service: Service) => Promise<boolean>;
}

const ServiceFormManager = ({ onSave }: ServiceFormManagerProps) => {
  const [selectedService, setSelectedService] = useState<Service | undefined>(undefined);
  const [serviceFormOpen, setServiceFormOpen] = useState(false);

  const handleAddService = () => {
    setSelectedService(undefined);
    setServiceFormOpen(true);
  };

  const handleEditService = (id: string, services: Service[]) => {
    const service = services.find(s => s.id === id);
    if (service) {
      setSelectedService(service);
      setServiceFormOpen(true);
    }
  };

  const handleSaveService = async (service: Service) => {
    const success = await onSave(service);
    if (success) {
      setServiceFormOpen(false);
    }
  };

  return {
    selectedService,
    serviceFormOpen,
    handleAddService,
    handleEditService,
    handleSaveService,
    handleCloseForm: () => setServiceFormOpen(false)
  };
};

export default ServiceFormManager;
