
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Service } from "@/utils/types";
import { ServiceFormProps, DEFAULT_SERVICE } from "./types";
import ServiceFormContent from "./ServiceFormContent";

const ServiceForm = ({ service, open, onClose, onSave }: ServiceFormProps) => {
  const [formData, setFormData] = useState<Service>(DEFAULT_SERVICE);
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
  }, [service]);

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
          
          <ServiceFormContent
            formData={formData}
            setFormData={setFormData}
            showPromotionType={showPromotionType}
            setShowPromotionType={setShowPromotionType}
          />
          
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

export default ServiceForm;
