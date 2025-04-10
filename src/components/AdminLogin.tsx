
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { verifyAdminCredentials } from "@/utils/storage";
import { toast } from "@/components/ui/use-toast";
import { LockKeyhole } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Small delay to simulate authentication
    setTimeout(() => {
      const isValid = verifyAdminCredentials(username, password);
      
      if (isValid) {
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo ao painel administrativo",
          variant: "default",
        });
        onLoginSuccess();
      } else {
        toast({
          title: "Falha na autenticação",
          description: "Credenciais inválidas. Tente novamente.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gold-light p-3 rounded-full">
              <LockKeyhole className="h-8 w-8 text-gold" />
            </div>
          </div>
          <CardTitle className="text-2xl font-serif text-navy">Acesso Administrativo</CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar o painel de administração.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Usuário</label>
              <Input
                id="username"
                placeholder="Digite seu nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Senha</label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Default: admin / admin123
              </p>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gold hover:bg-gold-dark"
              disabled={isLoading}
            >
              {isLoading ? "Autenticando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
