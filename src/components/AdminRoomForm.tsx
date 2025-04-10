
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Room } from "@/utils/types";
import { X, PlusCircle, Upload, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

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
  featured: false,
  promotion: false,
  promotionType: ""
};

const AdminRoomForm = ({ room, open, onClose, onSave }: AdminRoomFormProps) => {
  console.log('AdminRoomForm renderizado com open:', open);
  const [formData, setFormData] = useState<Room>(DEFAULT_ROOM);
  const [amenityInput, setAmenityInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showPromotionType, setShowPromotionType] = useState(false);
  
  const isEditing = !!room?.id;
  const title = isEditing ? "Editar Quarto" : "Adicionar Novo Quarto";
  
  useEffect(() => {
    if (room) {
      setFormData(room);
      setShowPromotionType(room.promotion || false);
    } else {
      setFormData(DEFAULT_ROOM);
      setShowPromotionType(false);
    }
    setAmenityInput("");
    setImageUrl("");
  }, [room]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "capacity" ? Number(value) : value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
    
    if (name === 'promotion') {
      setShowPromotionType(checked);
    }
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

  const addImageUrl = () => {
    if (imageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()]
      }));
      setImageUrl("");
    }
  };

  const uploadImage = async (file: File) => {
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `rooms/${fileName}`;
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      // Add to images array
      if (data) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, data.publicUrl]
        }));
      }
      
      toast({
        title: "Imagem carregada",
        description: "A imagem foi carregada com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao carregar imagem",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadImage(e.target.files[0]);
    }
  };

  const removeImage = (index: number) => {
    // Prevent removing all images
    if (formData.images.length > 1) {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      console.log('Dialog onOpenChange:', isOpen);
      if (!isOpen) onClose();
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
                  <PlusCircle className="w-4 h-4 mr-2" /> Adicionar
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

            <div>
              <Label>Imagens</Label>

              {/* URL input */}
              <div className="flex mt-2">
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="URL da imagem"
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={addImageUrl}
                  className="ml-2 bg-gold hover:bg-gold-dark"
                >
                  <PlusCircle className="w-4 h-4 mr-2" /> Adicionar URL
                </Button>
              </div>

              {/* File upload */}
              <div className="mt-2">
                <Label htmlFor="image-upload" className="block w-full cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-gray-400 transition-colors">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="mt-2 block text-sm text-gray-600">
                      {isUploading ? "Carregando..." : "Clique para carregar uma imagem"}
                    </span>
                  </div>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </Label>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`Imagem ${index + 1}`} 
                      className="w-full h-20 object-cover rounded-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                      disabled={formData.images.length <= 1}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
              />
              <Label htmlFor="featured">Quarto em Destaque</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="promotion"
                checked={formData.promotion}
                onCheckedChange={(checked) => handleSwitchChange('promotion', checked)}
              />
              <Label htmlFor="promotion">Quarto em Promoção</Label>
            </div>
            
            {showPromotionType && (
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="promotionType">Tipo de Promoção</Label>
                <Input
                  id="promotionType"
                  name="promotionType"
                  value={formData.promotionType}
                  onChange={handleChange}
                  placeholder="Ex: Verão, Férias, Feriado, etc."
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gold hover:bg-gold-dark" disabled={isUploading}>
              {isEditing ? "Atualizar" : "Adicionar"} Quarto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminRoomForm;
