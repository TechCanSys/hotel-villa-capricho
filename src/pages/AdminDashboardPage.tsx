import Navbar from "@/components/Navbar";
import  Footer  from "@/components/Footer";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const AdminDashboardPage = () => {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logout bem-sucedido",
        description: "Você foi desconectado com sucesso",
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4 mb-6">
          <div className="flex justify-end">
            <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
              Logout
            </Button>
          </div>
        </div>
        <AdminDashboard />
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;