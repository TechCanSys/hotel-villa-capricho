
import { Room, Service, Reservation } from './types';
import { supabase } from '@/integrations/supabase/client';

// Room functions
export const getRooms = async (): Promise<Room[]> => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*');
    
  if (error) {
    console.error('Error fetching rooms:', error);
    return [];
  }
  
  return data as Room[] || [];
};

export const getRoomById = async (id: string): Promise<Room | undefined> => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching room:', error);
    return undefined;
  }
  
  return data as Room;
};

export const saveRoom = async (room: Room) => {
  try {
    if (room.id) {
      // Update existing room
      const { data, error } = await supabase
        .from('rooms')
        .update(room)
        .eq('id', room.id)
        .select()
        .single();
    
      if (error) throw error;
      return data as Room;
    } else {
      // Create new room
      const newRoom = {
        ...room,
        id: Date.now().toString()
      };
      
      const { data, error } = await supabase
        .from('rooms')
        .insert([newRoom])
        .select()
        .single();
      
      if (error) throw error;
      return data as Room;
    }
  } catch (error) {
    console.error('Error saving room:', error);
    throw error;
  }
};

export const deleteRoom = async (id: string): Promise<Room[]> => {
  try {
    const { error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    // Fetch updated list
    return await getRooms();
  } catch (error) {
    console.error('Error deleting room:', error);
    throw error;
  }
};

// Service functions
export const getServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*');
    
  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  
  return data as Service[] || [];
};

export const getServiceById = async (id: string): Promise<Service | undefined> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching service:', error);
    return undefined;
  }
  
  return data as Service;
};

export const saveService = async (service: Service) => {
  try {
    if (service.id) {
      // Update existing service
      const { data, error } = await supabase
        .from('services')
        .update({
          name: service.name,
          description: service.description,
          icon: service.icon,
          featured: service.featured,
          images: service.images,
          promotion: service.promotion,
          promotionType: service.promotionType,
        })
        .eq('id', service.id)
        .select()
        .single();
        
      if (error) throw error;
      return data as Service;
    } else {
      // Create new service
      const { data, error } = await supabase
        .from('services')
        .insert([{
          name: service.name,
          description: service.description,
          icon: service.icon,
          featured: service.featured,
          images: service.images,
          promotion: service.promotion || false,
          promotionType: service.promotionType || null,
        }])
        .select()
        .single();
        
      if (error) throw error;
      return data as Service;
    }
  } catch (error) {
    console.error('Error saving service:', error);
    throw error;
  }
};

export const deleteService = async (id: string): Promise<Service[]> => {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    // Fetch updated list
    return await getServices();
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};

// Reservation functions
export const getReservations = async (): Promise<Reservation[]> => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*');
    
  if (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }
  
  return data as Reservation[] || [];
};

export const getReservationById = async (id: string): Promise<Reservation | undefined> => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching reservation:', error);
    return undefined;
  }
  
  return data as Reservation;
};

export const updateReservationStatus = async (id: string, status: string): Promise<Reservation | null> => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data as Reservation;
  } catch (error) {
    console.error('Error updating reservation status:', error);
    return null;
  }
};

export const deleteReservation = async (id: string): Promise<Reservation[]> => {
  try {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    // Fetch updated list
    return await getReservations();
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw error;
  }
};

export const createReservation = async (reservation: Omit<Reservation, 'id' | 'created_at' | 'updated_at'>): Promise<Reservation | null> => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .insert([reservation])
      .select()
      .single();
      
    if (error) throw error;
    return data as Reservation;
  } catch (error) {
    console.error('Error creating reservation:', error);
    return null;
  }
};
