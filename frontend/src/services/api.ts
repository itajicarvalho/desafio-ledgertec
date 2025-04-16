import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002', // endereço do seu backend NestJS
});

export default api;