import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://api-enersinc-andres-caro.onrender.com/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;