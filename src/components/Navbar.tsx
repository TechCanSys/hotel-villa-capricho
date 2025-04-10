
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="font-serif text-gold-dark text-xl md:text-2xl font-bold tracking-wider">
              Hotel Villa Capricho
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-navy hover:text-gold transition-colors font-medium">
              Home
            </Link>
            <Link to="/quartos" className="text-navy hover:text-gold transition-colors font-medium">
              Quartos
            </Link>
            <Link to="/servicos" className="text-navy hover:text-gold transition-colors font-medium">
              Serviços
            </Link>
            <Link to="/contato" className="text-navy hover:text-gold transition-colors font-medium">
              Contato
            </Link>
            <Button asChild variant="default" className="bg-gold hover:bg-gold-dark text-white">
              <Link to="/quartos">Reservar Agora</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="text-navy"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden bg-white absolute w-full transition-all duration-300 ease-in-out",
        mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 invisible"
      )}>
        <div className="flex flex-col space-y-4 px-4 py-5">
          <Link 
            to="/" 
            className="text-navy hover:text-gold transition-colors font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/quartos" 
            className="text-navy hover:text-gold transition-colors font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Quartos
          </Link>
          <Link 
            to="/servicos" 
            className="text-navy hover:text-gold transition-colors font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Serviços
          </Link>
          <Link 
            to="/contato" 
            className="text-navy hover:text-gold transition-colors font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contato
          </Link>
          <Button asChild variant="default" className="bg-gold hover:bg-gold-dark text-white w-full">
            <Link to="/quartos" onClick={() => setMobileMenuOpen(false)}>Reservar Agora</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
