const axios = require("axios");

const url =
  process.env.NODE_ENV === "production"
    ? "https://brigadiers.tech/"
    : "http://localhost:8000/";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: url,
});

export default axiosInstance;
