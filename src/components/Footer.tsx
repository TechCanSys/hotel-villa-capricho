
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-gold">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-gold" />
                <p>Av. Beira Mar, 1500 - Praia Central<br />Guarapari - ES, 29200-000</p>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gold" />
                <p>+55 (27) 3333-4444</p>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gold" />
                <p>contato@hotelvillacapricho.com</p>
              </div>
            </div>
            <div className="flex mt-4 space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-gold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/quartos" className="hover:text-gold transition-colors">Quartos</Link></li>
              <li><Link to="/servicos" className="hover:text-gold transition-colors">Serviços</Link></li>
              <li><Link to="/contato" className="hover:text-gold transition-colors">Contato</Link></li>
              <li><Link to="/admin" className="hover:text-gold transition-colors">Admin</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-gold">Newsletter</h3>
            <p className="mb-4">Receba nossas novidades e ofertas especiais.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="px-4 py-2 w-full rounded-l text-navy focus:outline-none"
              />
              <button 
                className="bg-gold hover:bg-gold-dark px-4 py-2 rounded-r transition-colors"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p>&copy; {currentYear} Hotel Villa Capricho. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
