
import { Room, Service } from './types';
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
  
  return data || [];
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
  
  return data || undefined;
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
      return data;
    } else {
      // Create new room
      const newRoom = {
        ...room,
        id: Date.now().toString()
      };
      
      const { data, error } = await supabase
        .from('rooms')
        .insert(newRoom)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Error saving room:', error);
    throw error;
  }
};

export const deleteRoom = async (id: string) => {
  const rooms = await getRooms();
  const updatedRooms = rooms.filter(room => room.id !== id);
  localStorage.setItem('rooms', JSON.stringify(updatedRooms));
  return updatedRooms;
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
  
  return data || [];
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
  
  return data || undefined;
};

export const saveService = async (service: Service) => {
  const services = await getServices();
  const existingIndex = services.findIndex(s => s.id === service.id);
  
  let updatedServices;
  if (existingIndex >= 0) {
    updatedServices = [...services];
    updatedServices[existingIndex] = service;
  } else {
    const newService = {
      ...service,
      id: Date.now().toString()
    };
    updatedServices = [...services, newService];
  }
  
  localStorage.setItem('services', JSON.stringify(updatedServices));
  return updatedServices;
};

export const deleteService = async (id: string) => {
  const services = await getServices();
  const updatedServices = services.filter(service => service.id !== id);
  localStorage.setItem('services', JSON.stringify(updatedServices));
  return updatedServices;
};

