import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface EventType {
  _id?: string;
  id?: number;
  name: string;
  date: string;
  time: string;
  location: string;
  type: 'online' | 'offline';
  description: string;
  image: string;
  category: 'event' | 'workshop' | 'hackathon';
}

export const fetchEvents = async (category?: string, type?: string) => {
  try {
    let url = `${API_URL}/events`;
    const params: Record<string, string> = {};
    
    if (category) {
      params.category = category;
    }
    
    if (type && type !== 'all') {
      params.type = type;
    }
    
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const fetchEventById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

export const createEvent = async (eventData: EventType) => {
  try {
    const response = await axios.post(`${API_URL}/events`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (id: string, eventData: Partial<EventType>) => {
  try {
    const response = await axios.put(`${API_URL}/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};