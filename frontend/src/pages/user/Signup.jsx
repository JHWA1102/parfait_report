import { useState } from "react";
import { signUp } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await signUp({
        email: form.email,
        password: form.password,
        name: form.name,
      });

      alert("회원가입이 완료되었습니다 🎉 로그인 해주세요.");
      navigate("/login");
    } catch (error) {
      alert("이미 가입된 이메일입니다.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-slate-100 px-4 pt-11 pb-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        {/* 타이틀 */}
        <h2 className="text-2xl font-semibold text-slate-900 text-center mb-2">
          회원가입
        </h2>
        <p className="text-sm text-slate-500 text-center mb-8">
          소득 및 지출 통합관리를 위한 회원 가입
        </p>

        {/* 이메일 */}
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-1">이메일</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="이메일을 입력하세요"
          />
        </div>

        {/* 이름 */}
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-1">이름</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="이름을 입력하세요"
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-1">비밀번호</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-1">
            비밀번호 확인
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>

        {/* 가입 버튼 */}
        <button onClick={handleSignup} className="btn-base w-full">
          회원가입
        </button>

        {/* 로그인 이동 */}
        <p className="text-sm text-center text-slate-500 mt-6">
          이미 계정이 있으신가요?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-slate-900 font-medium cursor-pointer hover:underline"
          >
            로그인
          </span>
        </p>
      </div>
    </div>
  );
}
