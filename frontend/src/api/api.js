import axios from "axios";

const api = axios.create({
  baseURL: "http://www.parfait-report.co.kr", // Spring Boot 서버 주소
  timeout: 5000,
});

export default api;
