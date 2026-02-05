// src/pages/feed/FeedComposer.jsx
export default function FeedComposer() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4 mb-6">
      <textarea
        placeholder="오늘 재무 상태에 대해 남겨보세요"
        className="
          w-full resize-none outline-none
          text-[15px] text-slate-800
          placeholder:text-slate-400
        "
        rows={3}
      />

      <div className="mt-3 flex justify-end">
        <button className="text-sm font-medium text-slate-600 hover:text-slate-900">
          기록하기
        </button>
      </div>
    </div>
  );
}
