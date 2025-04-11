
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Service } from "@/utils/types";
import { X, PlusCircle, Upload, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface AdminServiceFormProps {
  service?: Service;
  open: boolean;
  onClose: () => void;
  onSave: (service: Service) => void;
}

const DEFAULT_SERVICE: Service = {
  id: "",
  name: "",
  description: "",
  icon: "utensils",
  featured: false,
  images: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  promotion: false,
  promotionType: ""
};

const ICON_OPTIONS = [
  { value: "utensils", label: "Restaurante" },
  { value: "spa", label: "Spa" },
  { value: "pool", label: "Piscina" },
  { value: "concierge-bell", label: "Concierge" },
];

const AdminServiceForm = ({ service, open, onClose, onSave }: AdminServiceFormProps) => {
  const [formData, setFormData] = useState<Service>(DEFAULT_SERVICE);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showPromotionType, setShowPromotionType] = useState(false);
  
  const isEditing = !!service?.id;
  const title = isEditing ? "Editar Serviço" : "Adicionar Novo Serviço";
  
  useEffect(() => {
    if (service) {
      setFormData(service);
      setShowPromotionType(service.promotion || false);
    } else {
      setFormData(DEFAULT_SERVICE);
      setShowPromotionType(false);
    }
    setImageUrl("");
  }, [service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIconChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      icon: value
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

  const addImageUrl = () => {
    if (imageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), imageUrl.trim()]
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
      const filePath = `services/${fileName}`;
      
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
          images: [...(prev.images || []), data.publicUrl]
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
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{title}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name">Nome do Serviço*</Label>
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
            
            <div>
              <Label htmlFor="icon">Ícone</Label>
              <Select 
                value={formData.icon} 
                onValueChange={handleIconChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um ícone" />
                </SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      {icon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <Label htmlFor="service-image-upload" className="block w-full cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-gray-400 transition-colors">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="mt-2 block text-sm text-gray-600">
                      {isUploading ? "Carregando..." : "Clique para carregar uma imagem"}
                    </span>
                  </div>
                  <Input
                    id="service-image-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </Label>
              </div>
              
              {formData.images && formData.images.length > 0 ? (
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
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-20 bg-gray-100 rounded-md mt-3">
                  <Image className="w-6 h-6 text-gray-400 mr-2" />
                  <span className="text-gray-500">Nenhuma imagem adicionada</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
              />
              <Label htmlFor="featured">Serviço em Destaque</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="promotion"
                checked={formData.promotion}
                onCheckedChange={(checked) => handleSwitchChange('promotion', checked)}
              />
              <Label htmlFor="promotion">Serviço em Promoção</Label>
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
              {isEditing ? "Atualizar" : "Adicionar"} Serviço
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminServiceForm;
