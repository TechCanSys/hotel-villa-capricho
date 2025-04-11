
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import { getRoomById } from "@/utils/storage";
import { Room } from "@/utils/types";
import { ArrowLeft, Users, Bed, Coffee } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoom() {
      if (id) {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('id', id)
            .single();
            
          if (error) {
            console.error('Error fetching room:', error);
            setRoom(null);
          } else {
            setRoom(data as Room);
          }
        } catch (error) {
          console.error('Error:', error);
          setRoom(null);
        } finally {
          setLoading(false);
        }
      }
    }
    
    loadRoom();
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <Carousel className="w-full">
                <CarouselContent>
                  {room.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1 h-96">
                        <img 
                          src={image} 
                          alt={`${room.name} - Imagem ${index + 1}`} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-2">
                  <CarouselPrevious className="relative static transform-none mx-2" />
                  <CarouselNext className="relative static transform-none mx-2" />
                </div>
              </Carousel>
            </div>
            
            <div>
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-serif font-bold text-navy">{room.name}</h1>
                <div className="text-gold font-bold text-2xl">
                  {room.price} MZN<span className="text-sm text-gray-500">/noite</span>
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
              
              <div className="mt-8">
                <Button className="bg-gold hover:bg-gold-dark text-white w-full py-6 text-lg">
                  Reservar Agora
                </Button>
                <p className="text-sm text-center text-gray-500 mt-2">
                  Cancelamento gratuito até 48h antes do check-in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RoomDetail;
