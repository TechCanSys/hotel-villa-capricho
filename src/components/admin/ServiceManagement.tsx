import { useState } from "react";
import { Service } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ServiceList from "@/components/admin/ServiceList";
import { useServiceManagement } from "@/hooks/useServiceManagement";
import ServiceForm from "./service-form/ServiceForm";

interface ServiceManagementProps {
  initialServices?: Service[];
}

const ServiceManagement = ({ initialServices }: ServiceManagementProps) => {
  const { services, loading, deleteService, saveService } = useServiceManagement(initialServices);
  const [selectedService, setSelectedService] = useState<Service | undefined>(undefined);
  const [serviceFormOpen, setServiceFormOpen] = useState(false);

  const handleAddService = () => {
    setSelectedService(undefined);
    setServiceFormOpen(true);
  };

  const handleEditService = (id: string) => {
    const service = services.find(s => s.id === id);
    if (service) {
      setSelectedService(service);
      setServiceFormOpen(true);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-navy">Gerenciar Serviços</h2>
        <Button 
          onClick={handleAddService}
          className="bg-gold hover:bg-gold-dark text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar Serviço
        </Button>
      </div>
      
      <ServiceList
        services={services}
        loading={loading}
        onAdd={handleAddService}
        onEdit={handleEditService}
        onDelete={deleteService}
      />
      
      <ServiceForm 
        service={selectedService} 
        open={serviceFormOpen} 
        onClose={() => setServiceFormOpen(false)}
        onSave={saveService}
      />
    </>
  );
};

export default ServiceManagement;