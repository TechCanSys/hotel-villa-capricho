
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Service } from "@/utils/types";
import { getServices } from "@/utils/storage";

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchServices();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="pt-16">
        <Hero 
          title="Nossos Serviços"
          subtitle="Experiências exclusivas para tornar sua estadia inesquecível"
          showBookingButton={false}
          height="medium"
        />
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Serviços e Comodidades</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              O Hotel Villa Capricho oferece uma ampla gama de serviços e comodidades para garantir uma experiência excepcional durante sua estadia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Experiências Exclusivas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Além dos nossos serviços padrão, oferecemos experiências exclusivas para tornar sua estadia ainda mais especial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img 
                  src="/placeholder.svg" 
                  alt="Jantar romântico" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6">
                <h3 className="font-serif text-xl font-bold text-navy mb-3">Jantar Romântico</h3>
                <p className="text-gray-600 mb-4">
                  Surpreenda seu parceiro(a) com um jantar romântico à luz de velas na praia, com menu exclusivo preparado por nossos chefs e serviço personalizado.
                </p>
                <div className="text-gold font-bold">
                  A partir de 22.000 MZN por casal
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img 
                  src="/placeholder.svg" 
                  alt="Day spa" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6">
                <h3 className="font-serif text-xl font-bold text-navy mb-3">Day Spa Premium</h3>
                <p className="text-gray-600 mb-4">
                  Um dia inteiro de relaxamento com pacote completo incluindo massagens, tratamentos faciais, acesso à sauna e piscinas térmicas.
                </p>
                <div className="text-gold font-bold">
                  A partir de 17.500 MZN por pessoa
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img 
                  src="/placeholder.svg" 
                  alt="Passeio de barco" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6">
                <h3 className="font-serif text-xl font-bold text-navy mb-3">Passeio de Barco</h3>
                <p className="text-gray-600 mb-4">
                  Navegue pelas belas águas de Guarapari em um passeio exclusivo de barco, com paradas para mergulho e lanche a bordo.
                </p>
                <div className="text-gold font-bold">
                  A partir de 12.500 MZN por pessoa
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img 
                  src="/placeholder.svg" 
                  alt="Aula de culinária" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6">
                <h3 className="font-serif text-xl font-bold text-navy mb-3">Aula de Culinária</h3>
                <p className="text-gray-600 mb-4">
                  Aprenda a preparar pratos da gastronomia capixaba com nosso chef premiado, seguido de degustação dos pratos preparados.
                </p>
                <div className="text-gold font-bold">
                  A partir de 11.200 MZN por pessoa
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
