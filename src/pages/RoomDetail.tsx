
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import ReservationForm from "@/components/ReservationForm";
import { Button } from "@/components/ui/button";
import { getRoomById } from "@/utils/storage";
import { Room } from "@/utils/types";
import { ArrowLeft, Users, Bed, Coffee } from "lucide-react";

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const roomData = getRoomById(id);
      setRoom(roomData || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-2xl">Carregando...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl font-serif mb-4">Quarto não encontrado</h1>
          <p className="mb-6">O quarto que você está procurando não existe ou foi removido.</p>
          <Button asChild className="bg-gold hover:bg-gold-dark text-white">
            <Link to="/quartos">Voltar para Quartos</Link>
          </Button>
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
          <Button 
            asChild 
            variant="outline"
            className="mb-6"
          >
            <Link to="/quartos">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Quartos
            </Link>
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Gallery 
                  images={room.images} 
                  alt={room.name} 
                  height="h-[500px]"
                />
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-serif font-bold text-navy">{room.name}</h1>
                <div className="text-gold font-bold text-2xl">
                  R${room.price}<span className="text-sm text-gray-500">/noite</span>
                </div>
              </div>
              
              <div className="flex space-x-6 mb-6">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-navy mr-2" />
                  <span>{room.capacity} {room.capacity > 1 ? 'pessoas' : 'pessoa'}</span>
                </div>
                <div className="flex items-center">
                  <Bed className="w-5 h-5 text-navy mr-2" />
                  <span>{room.capacity > 1 ? 'Camas' : 'Cama'}</span>
                </div>
              </div>
              
              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 text-lg whitespace-pre-line">{room.description}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-serif font-bold text-navy mb-4">Comodidades</h2>
                <div className="grid grid-cols-2 gap-3">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Coffee className="w-4 h-4 text-gold mr-2" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <ReservationForm room={room} />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RoomDetail;
