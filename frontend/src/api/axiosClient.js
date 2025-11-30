import axios from 'axios';

// Creamos una instancia configurada
const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // La URL de tu Django
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;