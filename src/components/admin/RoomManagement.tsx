
import { useState, useEffect } from "react";
import { Room } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RoomCard from "@/components/RoomCard";
import AdminRoomForm from "@/components/AdminRoomForm";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RoomManagementProps {
  initialRooms?: Room[];
}

const RoomManagement = ({ initialRooms }: RoomManagementProps) => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms || []);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);
  const [roomFormOpen, setRoomFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialRooms) {
      loadRooms();
    }
  }, [initialRooms]);
  
  const loadRooms = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      setRooms(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar quartos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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

  const handleDeleteRoom = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este quarto?")) {
      try {
        const { error } = await supabase
          .from('rooms')
          .delete()
          .eq('id', id);
        
        if (error) {
          throw error;
        }
        
        setRooms(rooms.filter(room => room.id !== id));
        
        toast({
          title: "Quarto excluído",
          description: "O quarto foi excluído com sucesso.",
        });
      } catch (error: any) {
        toast({
          title: "Erro ao excluir quarto",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleSaveRoom = async (room: Room) => {
    try {
      if (room.id) {
        // Update existing room
        const { error } = await supabase
          .from('rooms')
          .update({
            name: room.name,
            description: room.description,
            price: room.price,
            capacity: room.capacity,
            amenities: room.amenities,
            images: room.images,
            featured: room.featured,
          })
          .eq('id', room.id);
        
        if (error) {
          throw error;
        }
        
        setRooms(rooms.map(r => r.id === room.id ? room : r));
        
        toast({
          title: "Quarto atualizado",
          description: "As alterações foram salvas com sucesso.",
        });
      } else {
        // Create new room
        const { data, error } = await supabase
          .from('rooms')
          .insert({
            name: room.name,
            description: room.description,
            price: room.price,
            capacity: room.capacity,
            amenities: room.amenities,
            images: room.images,
            featured: room.featured,
          })
          .select()
          .single();
        
        if (error) {
          throw error;
        }
        
        setRooms([...rooms, data]);
        
        toast({
          title: "Quarto adicionado",
          description: "O quarto foi adicionado com sucesso.",
        });
      }
      
      setRoomFormOpen(false);
    } catch (error: any) {
      toast({
        title: "Erro ao salvar quarto",
        description: error.message,
        variant: "destructive",
      });
    }
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
      
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
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
      )}
      
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
