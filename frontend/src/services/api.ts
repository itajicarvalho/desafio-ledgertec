import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002',
});

export const getDocuments = async () => {
  const response = await api.get('/documents');
  return response.data;
};

export const getDocumentByFilename = async (filename: string) => {
  const response = await api.get(`/documents/${filename}`);
  return response.data;
};

export const downloadDocument = async (filename: string) => {
  const response = await api.get(`/documents/download/${filename}`, {
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
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
