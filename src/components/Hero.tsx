
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle?: string;
  imagePath?: string;
  showBookingButton?: boolean;
  height?: "full" | "large" | "medium" | "small";
}

const Hero = ({ 
  title, 
  subtitle, 
  imagePath = "/placeholder.svg",
  showBookingButton = true,
  height = "large"
 }: HeroProps) => {
  const heightClasses = {
    full: "min-h-screen",
    large: "min-h-[80vh]",
    medium: "min-h-[60vh]",
    small: "min-h-[40vh]"
  };

  return (
    <div className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 hero-overlay z-10"></div>
        <img
          src={imagePath}
          alt="Hotel Villa Capricho"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl text-white font-serif font-bold mb-4 animate-fade-in">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl md:text-2xl text-white mb-8 animate-fade-in">
              {subtitle}
            </p>
          )}
          
          {showBookingButton && (
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold-dark text-white font-medium px-8 py-6 text-lg animate-fade-in"
            >
              <Link to="/quartos">Reservar Agora</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
