
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Service } from "@/utils/types";
import { Utensils, Leaf, Delete, Edit, Waves, Bell } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  isAdmin?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ServiceCard = ({ service, isAdmin = false, onEdit, onDelete }: ServiceCardProps) => {
  const { id, name, description, icon, images = [] } = service;

  const getIcon = () => {
    switch (icon) {
      case 'utensils':
        return <Utensils size={32} />;
      case 'spa':
        return <Leaf size={32} />;  // Changed from Spa to Leaf
      case 'pool':
        return <Waves size={32} />;  // Changed from Pool to Waves
      case 'concierge-bell':
        return <Bell size={32} />;  // Changed from BellConcierge to Bell
      default:
        return null;
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      {images && images.length > 0 ? (
        <div className="relative h-48 overflow-hidden">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {service.featured && (
            <div className="absolute top-4 right-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-medium">
              Destaque
            </div>
          )}
        </div>
      ) : (
        <div className="pt-6 flex justify-center">
          <div className="p-4 rounded-full bg-gold-light text-gold inline-block">
            {getIcon()}
          </div>
        </div>
      )}
      
      <CardContent className={`${images && images.length > 0 ? 'pt-6' : 'pt-4'} pb-4 text-center`}>
        <h3 className="text-xl font-serif font-bold text-navy mb-3">{name}</h3>
        <p className="text-gray-600 line-clamp-2">{description}</p>
      </CardContent>
      
      <CardFooter className="pt-2 pb-6">
        {isAdmin ? (
          <div className="flex space-x-3 w-full">
            <Button 
              variant="outline" 
              className="flex-1 border-navy text-navy hover:bg-navy hover:text-white"
              onClick={() => onEdit?.(id)}
            >
              <Edit className="w-4 h-4 mr-2" /> Editar
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white"
              onClick={() => onDelete?.(id)}
            >
              <Delete className="w-4 h-4 mr-2" /> Excluir
            </Button>
          </div>
        ) : (
          <Button asChild className="w-full bg-gold hover:bg-gold-dark text-white">
            <Link to={`/servicos/${id}`}>Ver Detalhes</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
