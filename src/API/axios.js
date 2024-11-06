import axios from 'axios';

const axiosInstance = axios.create({
  //local instance of firebase function
  baseURL : "http://127.0.0.1:5001/clone-7fbfd/us-central1/api",
  //deployed version of amazon server on WebGL2RenderingContext.com
  baseURL : "https://amazon-api-deploy-01j2.onrender.com/"
})

export {axiosInstance}