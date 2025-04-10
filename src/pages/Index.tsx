import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRooms, getServices } from "@/utils/storage";
import RoomCard from "@/components/RoomCard";
import ServiceCard from "@/components/ServiceCard";
import { Bed, Star, Phone, MapPin, Gem, Mail } from "lucide-react";

const Index = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);

  useEffect(() => {
    const rooms = getRooms();
    const services = getServices();
    
    setFeaturedRooms(rooms.filter(room => room.featured).slice(0, 3));
    setFeaturedServices(services.filter(service => service.featured).slice(0, 3));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-16">
        <Hero 
          title="Hotel Villa Capricho"
          subtitle="Uma experiência única de conforto e sofisticação."
          height="large"
        />
      </div>
      
      {/* About Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-6">Bem-vindo ao nosso refúgio de luxo</h2>
              <p className="text-gray-700 mb-6 text-lg">
                O Hotel Villa Capricho é um refúgio de requinte e sofisticação, localizado em um cenário privilegiado à beira-mar em Guarapari, Espírito Santo.
              </p>
              <p className="text-gray-700 mb-6">
                Nossa missão é proporcionar uma experiência única, combinando o charme da hospitalidade brasileira com serviços de classe mundial. Cada detalhe foi pensado para garantir momentos inesquecíveis, desde o design elegante dos quartos até a gastronomia refinada em nosso restaurante.
              </p>
              <div className="flex flex-wrap gap-8 my-8">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-gold-light">
                    <Bed className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium">25 Quartos</h3>
                    <p className="text-sm text-gray-600">Luxo e conforto</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-gold-light">
                    <Star className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium">5 Estrelas</h3>
                    <p className="text-sm text-gray-600">Hospedagem premium</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-gold-light">
                    <Gem className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium">Excelência</h3>
                    <p className="text-sm text-gray-600">Serviço de qualidade</p>
                  </div>
                </div>
              </div>
              <Button asChild className="bg-navy hover:bg-navy-dark mt-4">
                <Link to="/contato">Saiba Mais</Link>
              </Button>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <img 
                src="/placeholder.svg" 
                alt="Hotel Exterior" 
                className="rounded-lg shadow-lg col-span-2 w-full h-48 object-cover"
              />
              <img 
                src="/placeholder.svg" 
                alt="Lobby" 
                className="rounded-lg shadow-lg w-full h-48 object-cover"
              />
              <img 
                src="/placeholder.svg" 
                alt="Restaurant" 
                className="rounded-lg shadow-lg w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Rooms */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Nossos Melhores Quartos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore nossos quartos e suítes projetados para oferecer o máximo conforto e elegância durante sua estadia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-gold hover:bg-gold-dark">
              <Link to="/quartos">Ver Todos os Quartos</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title text-white mb-4">
              Nossos Serviços
              <span className="after:bg-gold"></span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Proporcionamos uma variedade de serviços de alta qualidade para tornar sua estadia inesquecível.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map(service => (
              <Card key={service.id} className="bg-white text-navy">
                <CardContent className="pt-6 text-center">
                  <ServiceCard service={service} />
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="text-white border-white hover:bg-white hover:text-navy">
              <Link to="/servicos">Ver Todos os Serviços</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Entre em Contato</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estamos à disposição para responder suas dúvidas e ajudar a planejar sua estadia perfeita.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gold-light">
                  <Phone className="h-6 w-6 text-gold" />
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-navy mb-2">Telefone</h3>
              <p className="text-gray-600">+55 (27) 3333-4444</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gold-light">
                  <MapPin className="h-6 w-6 text-gold" />
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-navy mb-2">Endereço</h3>
              <p className="text-gray-600">Av. Beira Mar, 1500 - Praia Central<br />Guarapari - ES</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gold-light">
                  <Mail className="h-6 w-6 text-gold" />
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-navy mb-2">Email</h3>
              <p className="text-gray-600">contato@hotelvillacapricho.com</p>
            </Card>
          </div>
          
          <div className="text-center mt-10">
            <Button asChild className="bg-gold hover:bg-gold-dark">
              <Link to="/contato">Contate-nos</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
