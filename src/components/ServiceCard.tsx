
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
  const { id, name, description, icon } = service;

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
      <CardContent className="pt-6 pb-4 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-gold-light text-gold inline-block">
            {getIcon()}
          </div>
        </div>
        
        <h3 className="text-xl font-serif font-bold text-navy mb-3">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
      
      {isAdmin && (
        <CardFooter className="pt-2 pb-6">
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
        </CardFooter>
      )}
    </Card>
  );
};

export default ServiceCard;
