
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  message: string | null;
  room_id: string;
  room_name: string;
  price: number;
  status: 'pending' | 'confirmed' | 'canceled';
  created_at: string;
}

const ReservationManagement = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setReservations(data as Reservation[] || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar reservas",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: 'confirmed' | 'canceled') => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setReservations(reservations.map(res => 
        res.id === id ? { ...res, status } : res
      ));

      if (selectedReservation?.id === id) {
        setSelectedReservation({ ...selectedReservation, status });
      }

      toast({
        title: status === 'confirmed' ? "Reserva confirmada" : "Reserva cancelada",
        description: `A reserva foi ${status === 'confirmed' ? 'confirmada' : 'cancelada'} com sucesso.`,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const viewReservationDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmada</Badge>;
      case 'canceled':
        return <Badge className="bg-red-500">Cancelada</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-navy">Gerenciar Reservas</h2>
        <Button 
          onClick={loadReservations}
          variant="outline"
          className="border-gold text-gold hover:bg-gold hover:text-white"
        >
          Atualizar
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {reservations.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Quarto</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Hóspedes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">{reservation.name}</TableCell>
                      <TableCell>{reservation.room_name}</TableCell>
                      <TableCell>
                        {format(parseISO(reservation.check_in), "dd/MM/yyyy", { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        {format(parseISO(reservation.check_out), "dd/MM/yyyy", { locale: ptBR })}
                      </TableCell>
                      <TableCell>{reservation.guests}</TableCell>
                      <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => viewReservationDetails(reservation)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {reservation.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-green-600 hover:text-green-800 hover:bg-green-100"
                                onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-600 hover:text-red-800 hover:bg-red-100"
                                onClick={() => handleStatusChange(reservation.id, 'canceled')}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500 bg-gray-50">
              <p className="text-xl mb-2">Nenhuma reserva encontrada.</p>
              <p>As reservas feitas pelos clientes aparecerão aqui.</p>
            </div>
          )}
        </div>
      )}

      {/* Reservation Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes da Reserva</DialogTitle>
            <DialogDescription>
              Informações detalhadas sobre a reserva
            </DialogDescription>
          </DialogHeader>

          {selectedReservation && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-bold text-lg">{selectedReservation.room_name}</span>
                {getStatusBadge(selectedReservation.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-medium">{selectedReservation.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contato</p>
                  <p>{selectedReservation.email}</p>
                  <p>{selectedReservation.phone}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p>{format(parseISO(selectedReservation.check_in), "dd/MM/yyyy", { locale: ptBR })}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p>{format(parseISO(selectedReservation.check_out), "dd/MM/yyyy", { locale: ptBR })}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Hóspedes</p>
                  <p>{selectedReservation.guests}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Diária</p>
                  <p>R$ {selectedReservation.price}</p>
                </div>
              </div>
              
              {selectedReservation.message && (
                <div>
                  <p className="text-sm text-gray-500">Mensagem</p>
                  <p className="bg-gray-50 p-3 rounded">{selectedReservation.message}</p>
                </div>
              )}
              
              {selectedReservation.status === 'pending' && (
                <div className="flex space-x-2 justify-end pt-4">
                  <Button 
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    onClick={() => handleStatusChange(selectedReservation.id, 'confirmed')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" /> Confirmar
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => handleStatusChange(selectedReservation.id, 'canceled')}
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Cancelar
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReservationManagement;
