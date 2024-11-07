import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? "http://127.0.0.1:5001/clone-7fbfd/us-central1/api"
    : "https://amazon-api-deploy-01j2.onrender.com/"
});

export { axiosInstance };
