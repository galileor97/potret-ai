import axios from 'axios';
// import.meta.env.VITE_BASE_URL
const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export default api;