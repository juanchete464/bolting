import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1'; // Ajusta esto según tu configuración

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setApiToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const getStatus = async () => {
  try {
    const response = await api.get('/status');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el estado:', error);
    throw error;
  }
};

export const getProfit = async () => {
  try {
    const response = await api.get('/profit');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los beneficios:', error);
    throw error;
  }
};

export const getPerformance = async () => {
  try {
    const response = await api.get('/performance');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el rendimiento:', error);
    throw error;
  }
};

export const startBot = async () => {
  try {
    const response = await api.post('/start');
    return response.data;
  } catch (error) {
    console.error('Error al iniciar el bot:', error);
    throw error;
  }
};

export const stopBot = async () => {
  try {
    const response = await api.post('/stop');
    return response.data;
  } catch (error) {
    console.error('Error al detener el bot:', error);
    throw error;
  }
};

// Añade más funciones según sea necesario para otras llamadas a la API

export default api;