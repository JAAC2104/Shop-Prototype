import axios from "axios";

const storeApi = axios.create({
    baseURL: 'https://fakestoreapi.com',
    timeout: 8000
})

storeApi.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err);
    return Promise.reject(err);
  }
);

export default storeApi;