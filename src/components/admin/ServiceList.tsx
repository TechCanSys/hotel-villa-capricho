
import React from "react";
import { Service } from "@/utils/types";
import ServiceCard from "@/components/ServiceCard";

interface ServiceListProps {
  services: Service[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ServiceList = ({ 
  services, 
  loading, 
  onAdd, 
  onEdit, 
  onDelete 
}: ServiceListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="col-span-3 text-center py-16 text-gray-500 bg-gray-50 rounded-lg">
        <p className="text-xl mb-4">Nenhum serviço cadastrado.</p>
        <button 
          onClick={onAdd}
          className="bg-gold hover:bg-gold-dark text-white px-4 py-2 rounded-md flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar Serviço
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map(service => (
        <ServiceCard 
          key={service.id} 
          service={service} 
          isAdmin={true} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default ServiceList;
