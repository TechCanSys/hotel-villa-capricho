
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { Service } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { getServiceById } from '@/utils/storage';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeImage, setActiveImage] = useState<string>('');
  
  useEffect(() => {
    const fetchServiceDetail = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const serviceData = await getServiceById(id);
        
        if (serviceData) {
          setService(serviceData);
          if (serviceData.images && serviceData.images.length > 0) {
            setActiveImage(serviceData.images[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServiceDetail();
  }, [id]);
  
  const handleImageClick = (image: string) => {
    setActiveImage(image);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Serviço não encontrado</h1>
          <p className="text-lg text-gray-600 mb-8">
            O serviço que você está procurando não foi encontrado.
          </p>
          <Button asChild className="bg-gold hover:bg-gold-dark text-white">
            <Link to="/services">Ver todos os serviços</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery */}
        <div className="w-full lg:w-1/2">
          <div className="mb-4">
            <img
              src={activeImage || '/placeholder.svg'}
              alt={service.name}
              className="w-full h-96 object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>
          
          {service.images && service.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {service.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${service.name} thumbnail ${index + 1}`}
                  className={`w-full h-20 object-cover rounded cursor-pointer ${activeImage === image ? 'ring-2 ring-gold' : ''}`}
                  onClick={() => handleImageClick(image)}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Service Details */}
        <div className="w-full lg:w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold font-serif">{service.name}</h1>
            <Button asChild variant="outline">
              <Link to="/services">← Voltar</Link>
            </Button>
          </div>

          <div className="prose max-w-none mb-6">
            <p className="text-lg text-gray-700">{service.description}</p>
          </div>
          
          {service.promotion && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700 font-semibold">
                {service.promotionType ? `Promoção: ${service.promotionType}` : 'Promoção Especial'}
              </p>
            </div>
          )}
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-gray-600">
              <span className="font-semibold mr-2">Disponível:</span> Todos os dias
            </div>
            <div className="flex items-center text-gray-600">
              <span className="font-semibold mr-2">Horário:</span> 8:00 - 22:00
            </div>
          </div>
          
          <Button className="w-full md:w-auto bg-gold hover:bg-gold-dark text-white mb-4">
            Fazer Reserva
          </Button>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-xl font-bold mb-4">Você pode gostar também:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold">Spa Relaxante</h4>
                <Button size="sm" variant="link" className="p-0 text-gold" asChild>
                  <Link to="/services/spa">Ver mais</Link>
                </Button>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold">Restaurante Gourmet</h4>
                <Button size="sm" variant="link" className="p-0 text-gold">Fazer reserva</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
