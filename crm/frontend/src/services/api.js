import axios from 'axios';

const API_URL = 'https://santcommweb-production.up.railway.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
};

// Contacts API
export const contactsAPI = {
  getAll: () => api.get('/contacts'),
  getOne: (id) => api.get(`/contacts/${id}`),
  create: (data) => api.post('/contacts', data),
  update: (id, data) => api.put(`/contacts/${id}`, data),
  delete: (id) => api.delete(`/contacts/${id}`),
};

// Companies API
export const companiesAPI = {
  getAll: () => api.get('/companies'),
  getOne: (id) => api.get(`/companies/${id}`),
  create: (data) => api.post('/companies', data),
  update: (id, data) => api.put(`/companies/${id}`, data),
  delete: (id) => api.delete(`/companies/${id}`),
};

// Deals API
export const dealsAPI = {
  getAll: () => api.get('/deals'),
  getOne: (id) => api.get(`/deals/${id}`),
  create: (data) => api.post('/deals', data),
  update: (id, data) => api.put(`/deals/${id}`, data),
  delete: (id) => api.delete(`/deals/${id}`),
};

// Leads API
export const leadsAPI = {
  getAll: () => api.get('/leads'),
  getOne: (id) => api.get(`/leads/${id}`),
  create: (data) => api.post('/leads', data),
  update: (id, data) => api.put(`/leads/${id}`, data),
  delete: (id) => api.delete(`/leads/${id}`),
  // Notes
  getNotes: (id) => api.get(`/leads/${id}/notes`),
  createNote: (id, data) => api.post(`/leads/${id}/notes`, data),
  updateNote: (id, noteId, data) => api.put(`/leads/${id}/notes/${noteId}`, data),
  deleteNote: (id, noteId) => api.delete(`/leads/${id}/notes/${noteId}`),
  // Attachments
  getAttachments: (id) => api.get(`/leads/${id}/attachments`),
  uploadAttachment: (id, formData) => api.post(`/leads/${id}/attachments`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  downloadAttachment: (id, attachmentId) => api.get(`/leads/${id}/attachments/${attachmentId}/download`, {
    responseType: 'blob'
  }),
  deleteAttachment: (id, attachmentId) => api.delete(`/leads/${id}/attachments/${attachmentId}`),
  // Activities
  getActivities: (id) => api.get(`/leads/${id}/activities`),
  createActivity: (id, data) => api.post(`/leads/${id}/activities`, data),
  updateActivity: (id, activityId, data) => api.put(`/leads/${id}/activities/${activityId}`, data),
  deleteActivity: (id, activityId) => api.delete(`/leads/${id}/activities/${activityId}`)
};

// Campaigns API
export const campaignsAPI = {
  getAll: () => api.get('/campaigns'),
  getOne: (id) => api.get(`/campaigns/${id}`),
  create: (data) => api.post('/campaigns', data),
  update: (id, data) => api.put(`/campaigns/${id}`, data),
  delete: (id) => api.delete(`/campaigns/${id}`),
  getContacts: (id) => api.get(`/campaigns/${id}/contacts`),
  addContacts: (id, data) => api.post(`/campaigns/${id}/contacts`, data),
  removeContact: (id, contactId) => api.delete(`/campaigns/${id}/contacts/${contactId}`),
  updateContactStatus: (id, contactId, data) => api.patch(`/campaigns/${id}/contacts/${contactId}`, data),
  execute: (id) => api.post(`/campaigns/${id}/execute`),
};

// Quotes API
export const quotesAPI = {
  getAll: () => api.get('/quotes'),
  getOne: (id) => api.get(`/quotes/${id}`),
  create: (data) => api.post('/quotes', data),
  update: (id, data) => api.put(`/quotes/${id}`, data),
  delete: (id) => api.delete(`/quotes/${id}`),
};

// Invoices API
export const invoicesAPI = {
  getAll: () => api.get('/invoices'),
  getOne: (id) => api.get(`/invoices/${id}`),
  create: (data) => api.post('/invoices', data),
  update: (id, data) => api.put(`/invoices/${id}`, data),
  delete: (id) => api.delete(`/invoices/${id}`),
};

// Forecasts API
export const forecastsAPI = {
  getAll: () => api.get('/forecasts'),
  getOne: (id) => api.get(`/forecasts/${id}`),
  create: (data) => api.post('/forecasts', data),
  update: (id, data) => api.put(`/forecasts/${id}`, data),
  delete: (id) => api.delete(`/forecasts/${id}`),
};

// Accounts API
export const accountsAPI = {
  getAll: () => api.get('/accounts'),
  getOne: (id) => api.get(`/accounts/${id}`),
  create: (data) => api.post('/accounts', data),
  update: (id, data) => api.put(`/accounts/${id}`, data),
  delete: (id) => api.delete(`/accounts/${id}`),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getCampaignMetrics: (id) => api.get(`/analytics/campaigns/${id}/metrics`),
  createMetric: (id, data) => api.post(`/analytics/campaigns/${id}/metrics`, data),
  getActivities: (id) => api.get(`/analytics/campaigns/${id}/activities`),
  createActivity: (id, data) => api.post(`/analytics/campaigns/${id}/activities`, data),
};

export default api;
