import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "https://devblogapp.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;