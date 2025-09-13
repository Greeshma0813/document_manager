import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Spring Boot base URL

export const createFileType = (data) => axios.post(`${API_URL}/file-types`, data);
export const getFileTypes = () => axios.get(`${API_URL}/file-types`);

export const createDocument = (data) => axios.post(`${API_URL}/documents`, data);
export const getDocuments = () => axios.get(`${API_URL}/documents`);
