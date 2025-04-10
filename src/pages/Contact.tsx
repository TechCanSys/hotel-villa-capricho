
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato o mais breve possível.",
        variant: "default",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="pt-16">
        <Hero 
          title="Entre em Contato"
          subtitle="Estamos à disposição para atender suas necessidades"
          showBookingButton={false}
          height="medium"
        />
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="p-6 hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-0">
                  <div className="flex items-start">
                    <div className="mr-4 p-3 rounded-full bg-gold-light">
                      <Phone className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-navy mb-2">Telefone</h3>
                      <p className="text-gray-600">Reservas: +55 (27) 3333-4444</p>
                      <p className="text-gray-600">Recepção: +55 (27) 3333-5555</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-0">
                  <div className="flex items-start">
                    <div className="mr-4 p-3 rounded-full bg-gold-light">
                      <Mail className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-navy mb-2">Email</h3>
                      <p className="text-gray-600">contato@hotelvillacapricho.com</p>
                      <p className="text-gray-600">reservas@hotelvillacapricho.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-0">
                  <div className="flex items-start">
                    <div className="mr-4 p-3 rounded-full bg-gold-light">
                      <MapPin className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-navy mb-2">Endereço</h3>
                      <p className="text-gray-600">
                        Av. Beira Mar, 1500 - Praia Central<br />
                        Guarapari - ES, 29200-000<br />
                        Brasil
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-0">
                  <div className="flex items-start">
                    <div className="mr-4 p-3 rounded-full bg-gold-light">
                      <Clock className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-navy mb-2">Horário de Funcionamento</h3>
                      <p className="text-gray-600">Recepção: 24 horas</p>
                      <p className="text-gray-600">Check-in: 14:00 às 22:00</p>
                      <p className="text-gray-600">Check-out: até 12:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-white">
                <CardContent className="p-0">
                  <h2 className="font-serif text-2xl font-bold text-navy mb-6">Envie-nos uma mensagem</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Nome completo*</label>
                        <Input
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email*</label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">Telefone*</label>
                        <Input
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">Assunto*</label>
                        <Input
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Motivo do contato"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Mensagem*</label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Como podemos ajudá-lo(a)?"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gold hover:bg-gold-dark text-white"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <span className="animate-spin mr-2">◌</span>
                          Enviando...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Enviar Mensagem
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title mb-4">Nossa Localização</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estrategicamente localizado em frente à praia, com fácil acesso às principais atrações de Guarapari.
            </p>
          </div>
          
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
            {/* Replace with actual map embed */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">Mapa do Google será exibido aqui.</p>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h3 className="font-serif text-xl font-bold text-navy mb-4">Como Chegar</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">De Carro</h4>
                <p className="text-gray-600">A partir de Vitória, siga pela BR-101 em direção ao sul por aproximadamente 50km até o acesso para Guarapari. Na cidade, siga as placas para o centro e Praia Central.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">De Ônibus</h4>
                <p className="text-gray-600">Ônibus intermunicipais partem regularmente do Terminal de Vitória para Guarapari. O ponto final fica a cerca de 10 minutos de táxi do hotel.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Do Aeroporto</h4>
                <p className="text-gray-600">O Aeroporto de Vitória fica a aproximadamente 60km do hotel. Oferecemos serviço de transfer mediante reserva prévia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
