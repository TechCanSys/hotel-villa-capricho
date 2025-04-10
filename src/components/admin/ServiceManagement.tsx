
import { useState, useEffect } from "react";
import { Service } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import AdminServiceForm from "@/components/AdminServiceForm";
import { toast } from "@/components/ui/use-toast";
import { getServices, saveService, deleteService } from "@/utils/storage";

interface ServiceManagementProps {
  initialServices?: Service[];
}

const ServiceManagement = ({ initialServices }: ServiceManagementProps) => {
  const [services, setServices] = useState<Service[]>(initialServices || []);
  const [selectedService, setSelectedService] = useState<Service | undefined>(undefined);
  const [serviceFormOpen, setServiceFormOpen] = useState(false);

  useEffect(() => {
    if (!initialServices) {
      loadServices();
    }
  }, [initialServices]);
  
  const loadServices = () => {
    setServices(getServices());
  };

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

  const handleDeleteService = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      const updatedServices = deleteService(id);
      setServices(updatedServices);
      
      toast({
        title: "Serviço excluído",
        description: "O serviço foi excluído com sucesso.",
      });
    }
  };

  const handleSaveService = (service: Service) => {
    const updatedServices = saveService(service);
    setServices(updatedServices);
    setServiceFormOpen(false);
    
    toast({
      title: service.id ? "Serviço atualizado" : "Serviço adicionado",
      description: service.id 
        ? "As alterações foram salvas com sucesso." 
        : "O serviço foi adicionado com sucesso.",
    });
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            isAdmin={true} 
            onEdit={handleEditService} 
            onDelete={handleDeleteService} 
          />
        ))}
        
        {services.length === 0 && (
          <div className="col-span-3 text-center py-16 text-gray-500 bg-gray-50 rounded-lg">
            <p className="text-xl mb-4">Nenhum serviço cadastrado.</p>
            <Button 
              onClick={handleAddService}
              className="bg-gold hover:bg-gold-dark text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Adicionar Serviço
            </Button>
          </div>
        )}
      </div>
      
      <AdminServiceForm 
        service={selectedService} 
        open={serviceFormOpen} 
        onClose={() => setServiceFormOpen(false)}
        onSave={handleSaveService}
      />
    </>
  );
};

export default ServiceManagement;
