
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import RoomCard from "@/components/RoomCard";
import { getRooms } from "@/utils/storage";
import { Room } from "@/utils/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [capacityFilter, setCapacityFilter] = useState<string>("all");

  useEffect(() => {
    const allRooms = getRooms();
    setRooms(allRooms);
    setFilteredRooms(allRooms);
  }, []);

  const handleCapacityFilter = (value: string) => {
    setCapacityFilter(value);
    
    if (value === "all") {
      setFilteredRooms(rooms);
    } else {
      const capacity = parseInt(value);
      setFilteredRooms(rooms.filter(room => room.capacity >= capacity));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="pt-16">
        <Hero 
          title="Nossos Quartos"
          subtitle="Conforto e luxo para sua estadia perfeita"
          showBookingButton={false}
          height="medium"
        />
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="section-title mb-4 md:mb-0">Quartos e Suítes</h2>
            
            <div className="flex items-center">
              <span className="mr-2 text-gray-700">Filtrar por capacidade:</span>
              <Select
                value={capacityFilter}
                onValueChange={handleCapacityFilter}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="1">1+ Pessoa</SelectItem>
                  <SelectItem value="2">2+ Pessoas</SelectItem>
                  <SelectItem value="3">3+ Pessoas</SelectItem>
                  <SelectItem value="4">4+ Pessoas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.length > 0 ? (
              filteredRooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))
            ) : (
              <div className="col-span-3 text-center py-16 text-gray-500">
                <p className="text-xl">Nenhum quarto encontrado com os critérios selecionados.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="section-title mb-4">Informações da Reserva</h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-serif text-xl font-bold mb-4 text-navy">Políticas de Reserva</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Check-in a partir das 14:00 e check-out até as 12:00</li>
                  <li>É necessário apresentar documento de identidade com foto no check-in</li>
                  <li>Caução de R$200 pode ser exigido na chegada (reembolsável)</li>
                  <li>Reservas devem ser feitas com pelo menos 24 horas de antecedência</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-serif text-xl font-bold mb-4 text-navy">Políticas de Cancelamento</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Cancelamentos gratuitos até 48 horas antes do check-in</li>
                  <li>Cancelamentos com menos de 48 horas de antecedência: cobrança de 50% do valor da reserva</li>
                  <li>No-show (não comparecimento): cobrança integral da reserva</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-serif text-xl font-bold mb-4 text-navy">Informações Adicionais</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Aceitamos pagamentos via cartão de crédito, débito e PIX</li>
                  <li>Estacionamento gratuito disponível para hóspedes</li>
                  <li>Wi-Fi gratuito em todas as áreas do hotel</li>
                  <li>Crianças até 6 anos não pagam (quando acompanhadas pelos pais)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Rooms;
