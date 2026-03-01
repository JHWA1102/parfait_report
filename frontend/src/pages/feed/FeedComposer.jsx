// src/pages/feed/FeedComposer.jsx
import { useState } from "react";
import { registFeed } from "../../api/feedApi";

export default function FeedComposer() {
  const [writerNo, setWriterNo] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");

  // 숫자만 입력
  const handleNumberChange = (e) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
    setWriterNo(onlyNumber);
  };

  // SHA-256 암호화
  const hashPassword = async (plainText) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plainText);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const handleSubmit = async () => {
    if (!writerNo || !password || !content.trim()) {
      alert("번호, 비밀번호, 내용을 모두 입력하세요.");
      return;
    }

    try {
      const encryptedPassword = await hashPassword(password);
      await registFeed({
        writerNo: Number(writerNo),
        password: encryptedPassword,
        title: "내 인사이트",
        content,
      });

      alert("등록 완료");

      setContent("");
      setPassword("");
    } catch (error) {
      console.error(error);
      alert("등록 실패");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4 mb-6">
      {/* 번호 입력 */}
      <input
        type="text"
        value={writerNo}
        onChange={handleNumberChange}
        placeholder="본인만 기억할 번호를 설정하세요 (조회 시 필요)"
        className="w-full mb-2 p-2 border rounded-lg text-sm"
      />

      {/* 비밀번호 입력 */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요"
        className="w-full mb-3 p-2 border rounded-lg text-sm"
      />

      {/* 내용 입력 */}
      <textarea
        placeholder="오늘 재무 상태에 대해 남겨보세요"
        className="
          w-full resize-none outline-none
          text-[15px] text-slate-800
          placeholder:text-slate-400
        "
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="mt-3 flex justify-end">
        <button onClick={handleSubmit} className="btn-base bg-white text-sm">
          기록하기
        </button>
      </div>

      <p className="text-xs text-slate-400 mt-2">
        🔒 비밀번호는 암호화되어 저장됩니다.
      </p>
    </div>
  );
}
