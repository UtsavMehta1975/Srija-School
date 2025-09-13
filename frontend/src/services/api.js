import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

console.log('checkpoint 1 api.js - API service initializing...');

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('checkpoint 2 api.js - API instance created', {
  baseURL: API_URL,
  timeout: 10000
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    console.log(`checkpoint 3 api.js - API Request: ${config.method?.toUpperCase()} ${config.url}`);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('checkpoint 4 api.js - Auth token added to request');
    }
    return config;
  },
  (error) => {
    console.error('checkpoint 5 api.js - Request interceptor error', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log(`checkpoint 6 api.js - API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('checkpoint 7 api.js - API Error', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      console.log('checkpoint 8 api.js - Unauthorized access, clearing auth data');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/api/admin/login', credentials),
  getCurrentUser: () => api.get('/api/admin/me'),
  changePassword: (data) => api.put('/api/admin/change-password', data),
};

// Carousel API
export const carouselAPI = {
  getSlides: () => api.get('/api/carousel'),
  getAllSlides: () => api.get('/api/carousel/admin/all'),
  getSlide: (id) => api.get(`/api/carousel/${id}`),
  createSlide: (formData) => api.post('/api/carousel', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateSlide: (id, formData) => api.put(`/api/carousel/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteSlide: (id) => api.delete(`/api/carousel/${id}`),
};

// Faculty API
export const facultyAPI = {
  getFaculty: () => api.get('/api/faculty'),
  getAllFaculty: () => api.get('/api/faculty/admin/all'),
  getFacultyMember: (id) => api.get(`/api/faculty/${id}`),
  createFacultyMember: (formData) => api.post('/api/faculty', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateFacultyMember: (id, formData) => api.put(`/api/faculty/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteFacultyMember: (id) => api.delete(`/api/faculty/${id}`),
};

// Gallery API
export const galleryAPI = {
  // Albums
  getAlbums: () => api.get('/api/gallery/albums'),
  getAllAlbums: () => api.get('/api/gallery/admin/albums'),
  getAlbum: (id) => api.get(`/api/gallery/albums/${id}`),
  createAlbum: (formData) => api.post('/api/gallery/admin/albums', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateAlbum: (id, formData) => api.put(`/api/gallery/admin/albums/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteAlbum: (id) => api.delete(`/api/gallery/admin/albums/${id}`),
  
  // Images
  getImagesByAlbum: (albumId) => api.get(`/api/gallery/albums/${albumId}/images`),
  getAllImages: () => api.get('/api/gallery/admin/images'),
  createImage: (formData) => api.post('/api/gallery/admin/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  createMultipleImages: (formData) => api.post('/api/gallery/admin/images/multiple', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateImage: (id, formData) => api.put(`/api/gallery/admin/images/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteImage: (id) => api.delete(`/api/gallery/admin/images/${id}`),
  
  // Videos
  getVideos: () => api.get('/api/gallery/videos'),
  getAllVideos: () => api.get('/api/gallery/admin/videos'),
  createVideo: (formData) => api.post('/api/gallery/admin/videos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateVideo: (id, formData) => api.put(`/api/gallery/admin/videos/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteVideo: (id) => api.delete(`/api/gallery/admin/videos/${id}`),
};

// Messages API
export const messagesAPI = {
  submitMessage: (data) => api.post('/api/messages', data),
  getAllMessages: () => api.get('/api/messages/admin'),
  getMessage: (id) => api.get(`/api/messages/admin/${id}`),
  markAsRead: (id) => api.put(`/api/messages/admin/${id}/read`),
  markAsUnread: (id) => api.put(`/api/messages/admin/${id}/unread`),
  deleteMessage: (id) => api.delete(`/api/messages/admin/${id}`),
  getMessageStats: () => api.get('/api/messages/admin/stats'),
};

// About API
export const aboutAPI = {
  getContent: () => api.get('/api/about'),
  getAllContent: () => api.get('/api/about/admin/all'),
  getSection: (section) => api.get(`/api/about/${section}`),
  createSection: (formData) => api.post('/api/about/admin', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateSection: (section, formData) => api.put(`/api/about/admin/${section}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteSection: (section) => api.delete(`/api/about/admin/${section}`),
};

export default api;

