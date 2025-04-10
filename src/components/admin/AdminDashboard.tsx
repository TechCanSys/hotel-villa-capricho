
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoomManagement from "./RoomManagement";
import ServiceManagement from "./ServiceManagement";
import { Room, Service } from "@/utils/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin');
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (profileError || profileData?.role !== 'admin') {
        throw new Error('Acesso não autorizado');
      }
    } catch (error) {
      toast({
        title: "Erro de autenticação",
        description: "Você não tem permissão para acessar esta página",
        variant: "destructive",
      });
      navigate('/admin');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load rooms
      const { data: roomsData, error: roomsError } = await supabase
        .from('rooms')
        .select('*');
      
      if (roomsError) {
        throw roomsError;
      }
      
      setRooms(roomsData || []);
      
      // Load services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*');
      
      if (servicesError) {
        throw servicesError;
      }
      
      setServices(servicesData || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 flex justify-center items-center" style={{ minHeight: "50vh" }}>
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-navy mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie os quartos e serviços do Hotel Villa Capricho.</p>
        </div>
        <Button
          onClick={loadData}
          className="bg-gold hover:bg-gold-dark text-white"
          disabled={loading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>
      
      <Tabs defaultValue="rooms" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="rooms">Quartos</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rooms">
          <RoomManagement initialRooms={rooms} />
        </TabsContent>
        
        <TabsContent value="services">
          <ServiceManagement initialServices={services} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
