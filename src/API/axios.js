import axios from 'axios';

const axiosInstance = axios.create({
  //deploy on render
  baseURL: "https://amazon-api-deploy-01j2.onrender.com/"});

export { axiosInstance };
