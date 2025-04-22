import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  throw new Error('VITE_API_URL não está definida no .env');
}

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export const getDocuments = async () => {
  const response = await api.get('/documents');
  return response.data;
};

export const getDocumentByFilename = async (filename: string) => {
  const response = await api.get(`/documents/${filename}`);
  return response.data;
};

export const downloadDocument = async (filename: string) => {
  await api.get(`/documents/download/${filename}`);
};

export const uploadDocument = async (file: File, metadata: Record<string, string>) => {
  const formData = new FormData();
  formData.append('file', file);
  Object.entries(metadata).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await api.post('/documents/upload', formData);

  return response.data;
};

export const signIn = async (email: string, password: string) => {
  const response = await api.post('/auth/signin', { email, password });
  return response.data;
};

export const signUp = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/signup', { name, email, password });
  return response.data;
};

export default api;
