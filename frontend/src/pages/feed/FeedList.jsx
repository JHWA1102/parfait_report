// src/pages/feed/FeedList.jsx
const mockFeeds = [
  {
    id: 1,
    content: "이번 달 고정비가 예상보다 12% 높다.",
    date: "2026.01.20",
  },
  {
    id: 2,
    content: "자산 대비 현금 비중이 너무 낮다. 조정 필요.",
    date: "2026.01.18",
  },
];

export default function FeedList() {
  return (
    <div className="space-y-4">
      {mockFeeds.map((feed) => (
        <div
          key={feed.id}
          className="bg-white rounded-xl border border-slate-100 p-5"
        >
          <p className="text-[15px] text-slate-800 leading-relaxed">
            {feed.content}
          </p>
          <div className="mt-3 text-xs text-slate-400">{feed.date}</div>
        </div>
      ))}
    </div>
  );
}
