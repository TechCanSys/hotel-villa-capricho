
import { useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface GalleryProps {
  images: string[];
  alt: string;
  height?: string;
}

const Gallery = ({ images, alt, height = "h-96" }: GalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={`flex items-center justify-center ${height} bg-gray-100 rounded-lg`}>
        <p className="text-gray-500">Nenhuma imagem disponível</p>
      </div>
    );
  }

  return (
    <div>
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className={`p-1 ${height} cursor-pointer`}>
                    <img
                      src={image}
                      alt={`${alt} - Imagem ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                      onClick={() => setActiveImageIndex(index)}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-3xl max-h-[90vh] p-0 overflow-hidden">
                  <div className="relative w-full h-full">
                    <Button 
                      onClick={(e) => e.stopPropagation()}
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <img
                      src={image}
                      alt={`${alt} - Imagem ${index + 1} (Ampliada)`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <div className="flex justify-center mt-2">
            <CarouselPrevious className="relative static transform-none mx-2" />
            <CarouselNext className="relative static transform-none mx-2" />
          </div>
        )}
      </Carousel>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mt-4">
          {images.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${alt} - Miniatura ${index + 1}`}
              className={`h-20 w-full object-cover rounded-md cursor-pointer ${
                activeImageIndex === index ? "ring-2 ring-gold" : ""
              }`}
              onClick={() => setActiveImageIndex(index)}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
