
import { useState, useEffect } from "react";
import { Service } from "@/utils/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const useServiceManagement = (initialServices?: Service[]) => {
  const [services, setServices] = useState<Service[]>(initialServices || []);
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

  const deleteService = async (id: string) => {
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

  // Add detailed logging for database operations
  const saveService = async (service: Service) => {
    try {
      console.log('Saving service:', service);
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
            promotion: service.promotion,
            promotionType: service.promotionType,
          })
          .eq('id', service.id);
        
        if (error) {
          console.error('Error updating service:', error);
          throw error;
        }
        
        console.log('Service updated successfully');
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
            promotion: service.promotion,
            promotionType: service.promotionType,
          }])
          .select()
          .single();
        
        if (error) {
          console.error('Error creating service:', error);
          throw error;
        }
        
        console.log('Service created successfully:', data);
        setServices([...services, data as Service]);
        
        toast({
          title: "Serviço adicionado",
          description: "O serviço foi adicionado com sucesso.",
        });
      }
      
      return true;
    } catch (error: any) {
      console.error('Error saving service:', error);
      toast({
        title: "Erro ao salvar serviço",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    services,
    loading,
    deleteService,
    saveService
  };
};
