// src/axiosConfig.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://13.49.68.73:8000/', // Replace with your backend API URL
});

export default api;
