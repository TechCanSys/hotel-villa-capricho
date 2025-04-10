
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Rooms from "@/pages/Rooms";
import RoomDetail from "@/pages/RoomDetail";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quartos" element={<Rooms />} />
        <Route path="/quartos/:id" element={<RoomDetail />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/servicos/:id" element={<ServiceDetail />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
