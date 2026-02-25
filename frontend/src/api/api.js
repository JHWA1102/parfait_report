import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Spring Boot 서버 주소
  timeout: 5000,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
