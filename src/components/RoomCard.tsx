
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Room } from "@/utils/types";

interface RoomCardProps {
  room: Room;
  isAdmin?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const RoomCard = ({ room, isAdmin = false, onEdit, onDelete }: RoomCardProps) => {
  const { id, name, description, price, capacity, amenities, images } = room;

  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden">
        <img
          src={images[0] || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {room.featured && (
          <div className="absolute top-4 right-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-medium">
            Destaque
          </div>
        )}
      </div>
      
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif font-bold text-navy">{name}</h3>
          <span className="text-gold font-bold">
            {price} MZN<span className="text-sm text-gray-500">/noite</span>
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="mr-4">
            <span className="font-medium">Capacidade:</span> {capacity} pessoas
          </span>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Comodidades:</p>
          <div className="flex flex-wrap gap-2">
            {amenities.slice(0, 3).map((amenity, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                +{amenities.length - 3}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-6">
        {isAdmin ? (
          <div className="flex space-x-3 w-full">
            <Button 
              variant="outline" 
              className="flex-1 border-navy text-navy hover:bg-navy hover:text-white"
              onClick={() => onEdit?.(id)}
            >
              Editar
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white"
              onClick={() => onDelete?.(id)}
            >
              Excluir
            </Button>
          </div>
        ) : (
          <Button asChild className="w-full bg-gold hover:bg-gold-dark text-white">
            <Link to={`/quartos/${id}`}>Ver Detalhes</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
