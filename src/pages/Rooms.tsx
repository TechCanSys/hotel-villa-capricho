import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoomCard from "@/components/RoomCard";
import { Room } from "@/utils/types";
import { getRooms } from "@/utils/storage";

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      setLoading(true);
      try {
        const allRooms = await getRooms();
        setRooms(allRooms);
        setFeaturedRooms(allRooms.filter(room => room.featured));
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRooms();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-navy mb-8">Nossos Quartos</h1>
          
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {featuredRooms.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-serif font-bold text-navy mb-4">Destaques</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredRooms.map(room => (
                      <RoomCard key={room.id} room={room} />
                    ))}
                  </div>
                </div>
              )}
              
              <h2 className="text-2xl font-serif font-bold text-navy mb-4">Todos os Quartos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map(room => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Rooms;
