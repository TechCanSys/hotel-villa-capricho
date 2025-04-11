import { useState, useEffect } from "react";
import { Reservation } from "@/utils/types";
import { getReservations, updateReservationStatus, deleteReservation } from "@/utils/storage";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Eye, Trash2 } from "lucide-react";
import { formatCurrency } from "../../lib/utils";

interface ReservationManagementProps {
  initialReservations?: Reservation[];
}

const ReservationManagement = ({ initialReservations }: ReservationManagementProps) => {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations || []);
  const [loading, setLoading] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    if (!initialReservations) {
      loadReservations();
    }
  }, [initialReservations]);
  
  const loadReservations = async () => {
    setLoading(true);
    try {
      const data = await getReservations();
      setReservations(data);
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

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const updatedReservation = await updateReservationStatus(id, status);
      
      if (updatedReservation) {
        setReservations(reservations.map(res => 
          res.id === updatedReservation.id ? updatedReservation : res
        ));
        
        toast({
          title: "Status atualizado",
          description: `Reserva alterada para ${status}`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteReservation = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta reserva?")) return;
    
    try {
      await deleteReservation(id);
      setReservations(reservations.filter(res => res.id !== id));
      
      toast({
        title: "Reserva excluída",
        description: "A reserva foi excluída com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao excluir reserva",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch (error) {
      return dateString;
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
          disabled={loading}
        >
          {loading ? "Carregando..." : "Atualizar Reservas"}
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {reservations.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Quarto</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map(reservation => (
                    <TableRow key={reservation.id}>
                      <TableCell>{reservation.name}</TableCell>
                      <TableCell>{reservation.room_name}</TableCell>
                      <TableCell>{formatDate(reservation.check_in)}</TableCell>
                      <TableCell>{formatDate(reservation.check_out)}</TableCell>
                      <TableCell>
                        <Select
                          defaultValue={reservation.status}
                          onValueChange={(value) => handleStatusChange(reservation.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pendente</SelectItem>
                            <SelectItem value="confirmed">Confirmada</SelectItem>
                            <SelectItem value="cancelled">Cancelada</SelectItem>
                            <SelectItem value="completed">Concluída</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedReservation(reservation)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="text-xl font-serif">Detalhes da Reserva</DialogTitle>
                              </DialogHeader>
                              {selectedReservation && (
                                <div className="space-y-3">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">Nome</p>
                                      <p className="text-lg">{selectedReservation.name}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">Email</p>
                                      <p className="text-lg">{selectedReservation.email}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">Telefone</p>
                                      <p className="text-lg">{selectedReservation.phone}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">Hóspedes</p>
                                      <p className="text-lg">{selectedReservation.guests}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">Check-in</p>
                                      <p className="text-lg">{formatDate(selectedReservation.check_in)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">Check-out</p>
                                      <p className="text-lg">{formatDate(selectedReservation.check_out)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">Quarto</p>
                                      <p className="text-lg">{selectedReservation.room_name}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">Preço</p>
                                      <p className="text-lg">{formatCurrency(selectedReservation.price)}</p>
                                    </div>
                                  </div>
                                  {selectedReservation.message && (
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">Mensagem</p>
                                      <p className="text-lg whitespace-pre-line">{selectedReservation.message}</p>
                                    </div>
                                  )}
                                </div>
                              )}
                              <DialogClose asChild>
                                <Button className="mt-4 bg-gold hover:bg-gold-dark text-white">Fechar</Button>
                              </DialogClose>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteReservation(reservation.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-500">Nenhuma reserva encontrada.</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ReservationManagement;
