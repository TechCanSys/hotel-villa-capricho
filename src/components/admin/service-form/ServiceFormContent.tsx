
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Service } from "@/utils/types";
import { ICON_OPTIONS } from "./types";
import ImageUploader from "./ImageUploader";

interface ServiceFormContentProps {
  formData: Service;
  setFormData: React.Dispatch<React.SetStateAction<Service>>;
  showPromotionType: boolean;
  setShowPromotionType: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServiceFormContent = ({ 
  formData, 
  setFormData,
  showPromotionType,
  setShowPromotionType
}: ServiceFormContentProps) => {

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

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({
      ...prev,
      images
    }));
  };

  return (
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
      
      <ImageUploader 
        images={formData.images} 
        onImagesChange={handleImagesChange} 
      />
      
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
  );
};

export default ServiceFormContent;
