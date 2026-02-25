export default function FeatureSection() {
  return (
    <section className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* 상단 타이틀 영역 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            세 가지 핵심 기능으로
            <br />
            완벽한 자산관리 경험
          </h2>

          <p className="text-slate-500 mt-6 md:mt-0 max-w-md">
            각 기능은 독립적으로 사용 가능하며, 함께 사용하면 더욱 강력합니다
          </p>
        </div>

        {/* 카드 영역 */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* 왼쪽 큰 카드 */}
          <div className="md:col-span-1 bg-[#EEF3F1] rounded-3xl p-8 flex flex-col justify-between shadow-sm">
            {/* 이미지 자리 */}
            <div className="bg-white/60 rounded-2xl h-48 mb-8"></div>

            {/* 아이콘 */}
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-400 text-white text-xl mb-4">
              📊
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              내 자산 파악하기
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              은행, 증권, 부동산 등 모든 자산을 한눈에 파악하세요. 카테고리별
              분류와 실시간 업데이트로 정확한 자산 현황을 확인할 수 있습니다.
            </p>

            <button className="text-orange-400 font-medium hover:underline">
              자세히 보기 →
            </button>
          </div>

          {/* 가운데 카드 */}
          <div className="bg-[#F8F9FA] rounded-3xl p-8 shadow-sm flex flex-col">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              월간자금리포트
            </h3>

            {/* 이미지 자리 */}
            <div className="bg-white rounded-2xl flex-1 min-h-[280px] shadow-inner"></div>
          </div>

          {/* 오른쪽 카드 */}
          <div className="bg-[#F8F9FA] rounded-3xl p-8 shadow-sm flex flex-col">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">피드</h3>

            {/* 이미지 자리 */}
            <div className="bg-white rounded-2xl flex-1 min-h-[280px] shadow-inner"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
