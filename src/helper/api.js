import axios from 'axios';
// import.meta.env.VITE_BASE_URL
const api = axios.create({
    baseURL: 'https://potret.galileor.com'
});

export default api;
