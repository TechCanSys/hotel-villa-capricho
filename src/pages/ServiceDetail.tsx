import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Service } from "@/utils/types";
import { getServiceById } from "@/utils/storage";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import { Utensils, Leaf, Waves, Bell, ArrowLeft } from "lucide-react";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      if (id) {
        setLoading(true);
        try {
          const data = await getServiceById(id);
          setService(data || null);
        } catch (error) {
          console.error("Error fetching service:", error);
          setService(null);
        } finally {
          setLoading(false);
        }
      }
    }
    
    fetchService();
  }, [id]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'utensils':
        return <Utensils size={48} />;
      case 'spa':
        return <Leaf size={48} />;
      case 'pool':
        return <Waves size={48} />;
      case 'concierge-bell':
        return <Bell size={48} />;
      default:
        return null;
    }
  };

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

  if (!service) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl font-serif mb-4">Serviço não encontrado</h1>
          <p className="mb-6">O serviço que você está procurando não existe ou foi removido.</p>
          <Button asChild className="bg-gold hover:bg-gold-dark text-white">
            <Link to="/servicos">Voltar para Serviços</Link>
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
            <Link to="/servicos">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Serviços
            </Link>
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              {service.images && service.images.length > 0 ? (
                <Carousel className="w-full">
                  <CarouselContent>
                    {service.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1 h-96">
                          <img 
                            src={image} 
                            alt={`${service.name} - Imagem ${index + 1}`} 
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
              ) : (
                <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                  <div className="p-10 rounded-full bg-gold-light text-gold">
                    {getIcon(service.icon)}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-serif font-bold text-navy mb-4">{service.name}</h1>
                <div className="flex items-center mb-6">
                  <div className="p-2 rounded-full bg-gold-light text-gold mr-4">
                    {getIcon(service.icon)}
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-gray-700 text-lg whitespace-pre-line">{service.description}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-serif font-bold text-navy mb-4">Reservas e Informações</h2>
                <p className="mb-4 text-gray-700">
                  Para agendar ou obter mais informações sobre este serviço, entre em contato com nossa recepção.
                </p>
                <Button className="bg-gold hover:bg-gold-dark text-white">
                  <Link to="/contato">Entre em contato</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
