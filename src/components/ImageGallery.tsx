
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  height?: string;
}

const ImageGallery = ({ images, alt, height = "h-96" }: ImageGalleryProps) => {
  if (!images || images.length === 0) {
    return (
      <div className={`flex items-center justify-center ${height} bg-gray-100 rounded-lg`}>
        <p className="text-gray-500">Nenhuma imagem disponível</p>
      </div>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className={`p-1 ${height}`}>
              <img
                src={image}
                alt={`${alt} - Imagem ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
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
  );
};

export default ImageGallery;
