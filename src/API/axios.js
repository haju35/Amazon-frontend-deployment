import axios from 'axios';

const axiosInstance = axios.create({
  //deploy on render
  baseURL: "https://amazon-api-deploy-2-k8zl.onrender.com/"});

export { axiosInstance };
