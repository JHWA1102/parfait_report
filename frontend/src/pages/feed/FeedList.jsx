export default function FeedList({ feeds }) {
  if (!feeds || feeds.length === 0) {
    return (
      <div className="text-sm text-slate-400 text-center mt-6">
        조회된 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {feeds.map((feed) => (
        <div
          key={feed.SEQ}
          className="bg-white rounded-xl border border-slate-100 p-5"
        >
          <p className="text-[15px] text-slate-800 leading-relaxed whitespace-pre-line">
            {feed.CONTENT}
          </p>

          <div className="mt-3 text-xs text-slate-400">
            {new Date(feed.REG_DT).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
