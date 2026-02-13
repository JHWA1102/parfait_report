// src/pages/feed/FeedPage.jsx
import { useState } from "react";
import FeedComposer from "./FeedComposer";
import FeedList from "./FeedList";

export default function FeedPage() {
  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState("");

  const handleLoad = () => {
    if (!code) return;
    console.log("불러오기 코드:", code);
    // TODO: 불러오기 로직
  };

  return (
    <div className="bg-[#F7F9FC] min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-6">
        {/* 제목 + 우측 액션 */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[22px] font-semibold text-slate-900">
            내 인사이트
          </h1>

          <button
            onClick={() => setShowInput((prev) => !prev)}
            className="
              text-sm font-medium
              text-slate-600
              hover:text-slate-900
              transition
            "
          >
            불러오기
          </button>
        </div>

        {/* 불러오기 영역 */}
        {showInput && (
          <div className="mb-6 bg-white border border-slate-100 rounded-xl p-4">
            <div className="flex gap-3">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="숫자만 입력하세요"
                className="
                  flex-1
                  rounded-lg
                  border border-slate-200
                  px-3 py-2
                  text-sm
                  outline-none
                  focus:border-slate-400
                "
              />

              <button
                onClick={handleLoad}
                className="
                  px-4 py-2
                  rounded-lg
                  bg-slate-900
                  text-white
                  text-sm font-medium
                  hover:bg-slate-800
                  transition
                "
              >
                확인
              </button>
            </div>

            {/* 보안 안내 */}
            <p className="mt-3 text-xs text-slate-500">
              🔒 데이터는 암호화되어 안전하게 저장됩니다
            </p>
          </div>
        )}

        <FeedComposer />
        <FeedList />
      </div>
    </div>
  );
}
