import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log(API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log(apiClient);

// Upload SOP Document
export const uploadSOP = async (file, fileName) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', fileName || file.name);
  formData.append('uploadedBy', 'admin');

  const response = await apiClient.post('/sops/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Query the Agent
export const queryAgent = async (query, stream = false) => {
  const response = await apiClient.post('/query', {
    query,
    stream,
  });

  return response.data;
};

// Query with streaming
export const queryAgentStream = async (query) => {
  return fetch(`${API_BASE_URL}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, stream: true }),
  });
};

// Get List of SOPs
export const listSOPs = async () => {
  const response = await apiClient.get('/sops');
  return response.data;
};

// Get specific SOP
export const getSOP = async (documentId) => {
  const response = await apiClient.get(`/sops/${documentId}`);
  return response.data;
};

// Delete SOP (Admin)
export const deleteSOP = async (documentId) => {
  const response = await apiClient.delete(`/admin/delete/${documentId}`);
  return response.data;
};

// Get Admin Stats
export const getAdminStats = async () => {
  const response = await apiClient.get('/admin/stats');
  return response.data;
};

// Reindex Document
export const reindexDocument = async (documentId) => {
  const response = await apiClient.put(`/admin/reindex/${documentId}`);
  return response.data;
};

export default apiClient;
