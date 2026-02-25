import api from "./api";

// 회원가입
export const signUp = (data) => {
  return api.post("/user/signup", data);
};

// 로그인
export const login = async (data) => {
  const response = await api.post("/user/login", data);

  const { accessToken } = response.data;

  // 토큰 저장
  localStorage.setItem("accessToken", accessToken);

  return response.data;
};

// 로그아웃
export const logout = () => {
  localStorage.removeItem("accessToken");
};
