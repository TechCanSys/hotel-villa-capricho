
import React, { useState, useEffect } from 'react';
import { Service } from '@/utils/types';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getServices } from '@/utils/storage';
import Hero from '@/components/Hero';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);
  
  const featuredServices = services.filter(service => service.featured);
  const promotionServices = services.filter(service => service.promotion);
  
  return (
    <div>
      <Hero 
        title="Nossos Serviços"
        subtitle="Descubra o conforto e a elegância que tornará sua estadia inesquecível"
        imagePath="/images/services-hero.jpg"
      />
      
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold mb-8 text-center">
          Experiências Exclusivas para Você
        </h2>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="featured">Destaques</TabsTrigger>
            <TabsTrigger value="promotions">Promoções</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-2xl text-gray-500">Nenhum serviço disponível no momento.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="featured">
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : featuredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-2xl text-gray-500">Nenhum serviço em destaque no momento.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="promotions">
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : promotionServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {promotionServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-2xl text-gray-500">Nenhuma promoção disponível no momento.</p>
                <Button className="mt-4 bg-gold hover:bg-gold-dark">Ver Todos os Serviços</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Services;
