
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoomManagement from "./RoomManagement";
import ServiceManagement from "./ServiceManagement";
import ReservationManagement from "./ReservationManagement";
import { Room, Service } from "@/utils/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

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
      
      setRooms(roomsData as Room[] || []);
      
      // Load services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*');
      
      if (servicesError) {
        throw servicesError;
      }
      
      setServices(servicesData as Service[] || []);
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
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-navy mb-2">Painel Administrativo</h1>
        <p className="text-gray-600">Gerencie os quartos, serviços e reservas do Hotel Villa Capricho.</p>
      </div>
      
      <Tabs defaultValue="rooms" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="rooms">Quartos</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="reservations">Reservas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rooms">
          <RoomManagement initialRooms={rooms} />
        </TabsContent>
        
        <TabsContent value="services">
          <ServiceManagement initialServices={services} />
        </TabsContent>

        <TabsContent value="reservations">
          <ReservationManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
