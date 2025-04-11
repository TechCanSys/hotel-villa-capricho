
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { PlusCircle, Upload, Image, X } from "lucide-react";

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

const ImageUploader = ({ images, onImagesChange }: ImageUploaderProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  const addImageUrl = () => {
    if (imageUrl.trim()) {
      onImagesChange([...images, imageUrl.trim()]);
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
        onImagesChange([...images, data.publicUrl]);
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
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
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
      
      {images && images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 mt-3">
          {images.map((image, index) => (
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
  );
};

export default ImageUploader;
