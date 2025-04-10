
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoomManagement from "./RoomManagement";
import ServiceManagement from "./ServiceManagement";
import { Room, Service } from "@/utils/types";
import { getRooms, getServices } from "@/utils/storage";

const AdminDashboard = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setRooms(getRooms());
    setServices(getServices());
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-navy mb-2">Painel Administrativo</h1>
        <p className="text-gray-600">Gerencie os quartos e serviços do Hotel Villa Capricho.</p>
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
