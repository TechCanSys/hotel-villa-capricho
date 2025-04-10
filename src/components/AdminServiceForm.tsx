
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Service } from "@/utils/types";

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
  featured: false
};

const ICON_OPTIONS = [
  { value: "utensils", label: "Restaurante" },
  { value: "spa", label: "Spa" },
  { value: "pool", label: "Piscina" },
  { value: "concierge-bell", label: "Concierge" },
];

const AdminServiceForm = ({ service, open, onClose, onSave }: AdminServiceFormProps) => {
  const [formData, setFormData] = useState<Service>(DEFAULT_SERVICE);
  
  const isEditing = !!service?.id;
  const title = isEditing ? "Editar Serviço" : "Adicionar Novo Serviço";
  
  useEffect(() => {
    if (service) {
      setFormData(service);
    } else {
      setFormData(DEFAULT_SERVICE);
    }
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

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      featured: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
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
            
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="featured">Serviço em Destaque</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gold hover:bg-gold-dark">
              {isEditing ? "Atualizar" : "Adicionar"} Serviço
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminServiceForm;
