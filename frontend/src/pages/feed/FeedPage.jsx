import { useState } from "react";
import FeedComposer from "./FeedComposer";
import FeedList from "./FeedList";
import { getFeedList } from "../../api/feedApi";

export default function FeedPage() {
  const [showInput, setShowInput] = useState(false);
  const [writerNo, setWriterNo] = useState("");
  const [password, setPassword] = useState("");
  const [feeds, setFeeds] = useState([]);

  // SHA-256
  const hashPassword = async (plainText) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plainText);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleLoad = async () => {
    if (!writerNo || !password) {
      alert("번호와 비밀번호를 입력하세요.");
      return;
    }

    try {
      const encryptedPassword = await hashPassword(password);

      const data = await getFeedList({
        writerNo: Number(writerNo),
        password: encryptedPassword,
      });

      setFeeds(data);
      setShowInput(false);
    } catch (error) {
      console.error(error);
      alert("번호 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="bg-[#F7F9FC] min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[22px] font-semibold text-slate-900">
            내 인사이트
          </h1>

          <button
            onClick={() => setShowInput((prev) => !prev)}
            className="btn-base"
          >
            불러오기
          </button>
        </div>

        {showInput && (
          <div className="mb-6 bg-white border border-slate-100 rounded-xl p-4">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={writerNo}
                onChange={(e) =>
                  setWriterNo(e.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder="번호를 입력하세요"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />

              <button
                onClick={handleLoad}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm"
              >
                확인
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              🔒 번호와 비밀번호가 일치해야 조회됩니다
            </p>
          </div>
        )}

        <FeedComposer />
        <FeedList feeds={feeds} />
      </div>
    </div>
  );
}
