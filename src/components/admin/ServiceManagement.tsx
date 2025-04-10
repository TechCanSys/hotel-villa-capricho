
import { useState, useEffect } from "react";
import { Service } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import AdminServiceForm from "@/components/AdminServiceForm";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ServiceManagementProps {
  initialServices?: Service[];
}

const ServiceManagement = ({ initialServices }: ServiceManagementProps) => {
  const [services, setServices] = useState<Service[]>(initialServices || []);
  const [selectedService, setSelectedService] = useState<Service | undefined>(undefined);
  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialServices) {
      loadServices();
    }
  }, [initialServices]);
  
  const loadServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      setServices(data as Service[] || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar serviços",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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

  const handleDeleteService = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      try {
        const { error } = await supabase
          .from('services')
          .delete()
          .eq('id', id);
        
        if (error) {
          throw error;
        }
        
        setServices(services.filter(service => service.id !== id));
        
        toast({
          title: "Serviço excluído",
          description: "O serviço foi excluído com sucesso.",
        });
      } catch (error: any) {
        toast({
          title: "Erro ao excluir serviço",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleSaveService = async (service: Service) => {
    try {
      if (service.id) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update({
            name: service.name,
            description: service.description,
            icon: service.icon,
            featured: service.featured,
            images: service.images,
          })
          .eq('id', service.id);
        
        if (error) {
          throw error;
        }
        
        setServices(services.map(s => s.id === service.id ? service : s));
        
        toast({
          title: "Serviço atualizado",
          description: "As alterações foram salvas com sucesso.",
        });
      } else {
        // Create new service
        const { data, error } = await supabase
          .from('services')
          .insert([{
            name: service.name,
            description: service.description,
            icon: service.icon,
            featured: service.featured,
            images: service.images,
          }])
          .select()
          .single();
        
        if (error) {
          throw error;
        }
        
        setServices([...services, data as Service]);
        
        toast({
          title: "Serviço adicionado",
          description: "O serviço foi adicionado com sucesso.",
        });
      }
      
      setServiceFormOpen(false);
    } catch (error: any) {
      toast({
        title: "Erro ao salvar serviço",
        description: error.message,
        variant: "destructive",
      });
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
      
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
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
      )}
      
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
