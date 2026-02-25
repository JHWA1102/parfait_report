import { useState } from "react";
import { login } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login({ email, password });

      alert("로그인 완료되었습니다.");

      setTimeout(() => {
        navigate("/");
      }, 300);
    } catch (error) {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        {/* 타이틀 */}
        <h2 className="text-2xl font-semibold text-slate-900 text-center mb-2">
          로그인
        </h2>
        <p className="text-sm text-slate-500 text-center mb-8">
          소득 및 지출 통합관리를 위한 개인 페이지
        </p>

        {/* 이메일 */}
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-1">이메일</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-1">비밀번호</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className="w-full py-2.5 bg-slate-900 rounded-lg font-semibold hover:bg-slate-800 transition"
        >
          로그인
        </button>

        {/* 회원가입 링크 */}
        <p className="text-sm text-center text-slate-500 mt-6">
          계정이 없으신가요?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-slate-900 font-medium cursor-pointer hover:underline"
          >
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
}
