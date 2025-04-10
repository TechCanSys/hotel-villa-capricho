
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Room } from "@/utils/types";

interface AdminRoomFormProps {
  room?: Room;
  open: boolean;
  onClose: () => void;
  onSave: (room: Room) => void;
}

const DEFAULT_ROOM: Room = {
  id: "",
  name: "",
  description: "",
  price: 0,
  capacity: 1,
  amenities: [],
  images: ["/placeholder.svg"],
  featured: false
};

const AdminRoomForm = ({ room, open, onClose, onSave }: AdminRoomFormProps) => {
  const [formData, setFormData] = useState<Room>(DEFAULT_ROOM);
  const [amenityInput, setAmenityInput] = useState("");
  
  const isEditing = !!room?.id;
  const title = isEditing ? "Editar Quarto" : "Adicionar Novo Quarto";
  
  useEffect(() => {
    if (room) {
      setFormData(room);
    } else {
      setFormData(DEFAULT_ROOM);
    }
  }, [room]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "capacity" ? Number(value) : value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      featured: checked
    }));
  };

  const addAmenity = () => {
    if (amenityInput.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput.trim()]
      }));
      setAmenityInput("");
    }
  };

  const removeAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{title}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name">Nome do Quarto*</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="description">Descrição*</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Preço por Noite (R$)*</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacidade (pessoas)*</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label>Comodidades</Label>
              <div className="flex mt-2">
                <Input
                  value={amenityInput}
                  onChange={(e) => setAmenityInput(e.target.value)}
                  placeholder="Ex: Wi-Fi, TV, etc."
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={addAmenity}
                  className="ml-2 bg-gold hover:bg-gold-dark"
                >
                  Adicionar
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.amenities.map((amenity, index) => (
                  <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                    {amenity}
                    <button
                      type="button"
                      className="ml-2 text-gray-500 hover:text-red-500"
                      onClick={() => removeAmenity(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="featured">Quarto em Destaque</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gold hover:bg-gold-dark">
              {isEditing ? "Atualizar" : "Adicionar"} Quarto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminRoomForm;
