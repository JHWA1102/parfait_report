import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Spring Boot 서버 주소
  timeout: 5000,
});

export default api;
