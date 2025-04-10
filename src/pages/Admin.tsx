
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminLogin from "@/components/AdminLogin";
import RoomCard from "@/components/RoomCard";
import ServiceCard from "@/components/ServiceCard";
import AdminRoomForm from "@/components/AdminRoomForm";
import AdminServiceForm from "@/components/AdminServiceForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { getRooms, getServices, saveRoom, saveService, deleteRoom, deleteService } from "@/utils/storage";
import { Room, Service } from "@/utils/types";
import { Plus } from "lucide-react";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);
  const [selectedService, setSelectedService] = useState<Service | undefined>(undefined);
  const [roomFormOpen, setRoomFormOpen] = useState(false);
  const [serviceFormOpen, setServiceFormOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    setRooms(getRooms());
    setServices(getServices());
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Room handlers
  const handleAddRoom = () => {
    setSelectedRoom(undefined);
    setRoomFormOpen(true);
  };

  const handleEditRoom = (id: string) => {
    const room = rooms.find(r => r.id === id);
    if (room) {
      setSelectedRoom(room);
      setRoomFormOpen(true);
    }
  };

  const handleDeleteRoom = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este quarto?")) {
      const updatedRooms = deleteRoom(id);
      setRooms(updatedRooms);
      
      toast({
        title: "Quarto excluído",
        description: "O quarto foi excluído com sucesso.",
      });
    }
  };

  const handleSaveRoom = (room: Room) => {
    const updatedRooms = saveRoom(room);
    setRooms(updatedRooms);
    setRoomFormOpen(false);
    
    toast({
      title: room.id ? "Quarto atualizado" : "Quarto adicionado",
      description: room.id 
        ? "As alterações foram salvas com sucesso." 
        : "O quarto foi adicionado com sucesso.",
    });
  };

  // Service handlers
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

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="pt-16 flex-grow">
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-grow">
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-navy">Gerenciar Quartos</h2>
                <Button 
                  onClick={handleAddRoom}
                  className="bg-gold hover:bg-gold-dark text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Quarto
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map(room => (
                  <RoomCard 
                    key={room.id} 
                    room={room} 
                    isAdmin={true} 
                    onEdit={handleEditRoom} 
                    onDelete={handleDeleteRoom} 
                  />
                ))}
                
                {rooms.length === 0 && (
                  <div className="col-span-3 text-center py-16 text-gray-500 bg-gray-50 rounded-lg">
                    <p className="text-xl mb-4">Nenhum quarto cadastrado.</p>
                    <Button 
                      onClick={handleAddRoom}
                      className="bg-gold hover:bg-gold-dark text-white"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Adicionar Quarto
                    </Button>
                  </div>
                )}
              </div>
              
              <AdminRoomForm 
                room={selectedRoom} 
                open={roomFormOpen} 
                onClose={() => setRoomFormOpen(false)}
                onSave={handleSaveRoom}
              />
            </TabsContent>
            
            <TabsContent value="services">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
