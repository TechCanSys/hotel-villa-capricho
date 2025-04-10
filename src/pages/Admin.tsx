
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-grow">
        {!isAuthenticated ? (
          <div className="pt-16 flex-grow">
            <AdminLogin onLoginSuccess={handleLoginSuccess} />
          </div>
        ) : (
          <AdminDashboard />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
