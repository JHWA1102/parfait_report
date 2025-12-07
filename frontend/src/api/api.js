import axios from "axios";

const api = axios.create({
  baseURL: "http://52.78.47.157", // Spring Boot 서버 주소
  timeout: 5000,
});

export default api;
