
import { useState, useEffect } from "react";
import { Room } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RoomCard from "@/components/RoomCard";
import AdminRoomForm from "@/components/AdminRoomForm";
import { toast } from "@/components/ui/use-toast";
import { getRooms, saveRoom, deleteRoom } from "@/utils/storage";

interface RoomManagementProps {
  initialRooms?: Room[];
}

const RoomManagement = ({ initialRooms }: RoomManagementProps) => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms || []);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);
  const [roomFormOpen, setRoomFormOpen] = useState(false);

  useEffect(() => {
    if (!initialRooms) {
      loadRooms();
    }
  }, [initialRooms]);
  
  const loadRooms = () => {
    setRooms(getRooms());
  };

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

  return (
    <>
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
    </>
  );
};

export default RoomManagement;
