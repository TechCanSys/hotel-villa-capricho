
import { Room, Service } from './types';

// Default admin credentials
const DEFAULT_ADMIN: { username: string; password: string } = {
  username: 'admin',
  password: 'admin123'
};

// Default room data
const DEFAULT_ROOMS: Room[] = [
  {
    id: '1',
    name: 'Suite Luxo',
    description: 'Nossa suíte mais espaçosa com vista para o mar, perfeita para casais em lua de mel.',
    price: 28000,
    capacity: 2,
    amenities: ['Cama King Size', 'Jacuzzi', 'Varanda', 'Minibar', 'TV 50"'],
    images: ['/placeholder.svg', '/placeholder.svg'],
    featured: true
  },
  {
    id: '2',
    name: 'Quarto Superior',
    description: 'Quarto confortável com vista para os jardins e acesso à piscina.',
    price: 22000,
    capacity: 2,
    amenities: ['Cama Queen Size', 'Chuveiro luxuoso', 'TV 42"', 'Frigobar'],
    images: ['/placeholder.svg'],
    featured: true
  },
  {
    id: '3',
    name: 'Suíte Familiar',
    description: 'Espaçosa suíte com quarto adicional, ideal para famílias com crianças.',
    price: 34500,
    capacity: 4,
    amenities: ['Cama King Size', 'Duas camas de solteiro', 'Banheiro duplo', 'Área de estar', 'TV 55"'],
    images: ['/placeholder.svg'],
    featured: false
  }
];

// Default service data
const DEFAULT_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Restaurante Gourmet',
    description: 'Saboreie pratos requintados da culinária internacional preparados por nossos chefs.',
    icon: 'utensils',
    featured: true,
    images: ['/placeholder.svg', '/placeholder.svg']
  },
  {
    id: '2',
    name: 'Spa & Bem-estar',
    description: 'Relaxe com nossos tratamentos de spa e massagens terapêuticas.',
    icon: 'spa',
    featured: true,
    images: ['/placeholder.svg']
  },
  {
    id: '3',
    name: 'Piscina Aquecida',
    description: 'Aproveite nossa piscina aquecida com bar molhado e espreguiçadeiras.',
    icon: 'pool',
    featured: true,
    images: []
  },
  {
    id: '4',
    name: 'Concierge 24h',
    description: 'Nosso serviço de concierge está disponível 24 horas para atender suas necessidades.',
    icon: 'concierge-bell',
    featured: false,
    images: []
  },
];

// Admin functions
export const getAdminUser = () => {
  const storedAdmin = localStorage.getItem('admin');
  return storedAdmin ? JSON.parse(storedAdmin) : DEFAULT_ADMIN;
};

export const verifyAdminCredentials = (username: string, password: string) => {
  const admin = getAdminUser();
  return username === admin.username && password === admin.password;
};

// Room functions
export const getRooms = (): Room[] => {
  const storedRooms = localStorage.getItem('rooms');
  return storedRooms ? JSON.parse(storedRooms) : DEFAULT_ROOMS;
};

export const getRoomById = (id: string): Room | undefined => {
  const rooms = getRooms();
  return rooms.find(room => room.id === id);
};

export const saveRoom = (room: Room) => {
  const rooms = getRooms();
  const existingIndex = rooms.findIndex(r => r.id === room.id);
  
  let updatedRooms;
  if (existingIndex >= 0) {
    updatedRooms = [...rooms];
    updatedRooms[existingIndex] = room;
  } else {
    const newRoom = {
      ...room,
      id: Date.now().toString()
    };
    updatedRooms = [...rooms, newRoom];
  }
  
  localStorage.setItem('rooms', JSON.stringify(updatedRooms));
  return updatedRooms;
};

export const deleteRoom = (id: string) => {
  const rooms = getRooms();
  const updatedRooms = rooms.filter(room => room.id !== id);
  localStorage.setItem('rooms', JSON.stringify(updatedRooms));
  return updatedRooms;
};

// Service functions
export const getServices = (): Service[] => {
  const storedServices = localStorage.getItem('services');
  return storedServices ? JSON.parse(storedServices) : DEFAULT_SERVICES;
};

export const getServiceById = (id: string): Service | undefined => {
  const services = getServices();
  return services.find(service => service.id === id);
};

export const saveService = (service: Service) => {
  const services = getServices();
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

export const deleteService = (id: string) => {
  const services = getServices();
  const updatedServices = services.filter(service => service.id !== id);
  localStorage.setItem('services', JSON.stringify(updatedServices));
  return updatedServices;
};

