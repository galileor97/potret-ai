import axios from 'axios';
// import.meta.env.VITE_BASE_URL
const api = axios.create({
    baseURL: 'http://34.229.241.54'
});

export default api;