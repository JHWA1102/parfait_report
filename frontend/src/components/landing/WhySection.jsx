export default function WhySection() {
  const features = [
    {
      icon: "🔒",
      title: "100% 수동 입력",
      desc: "계좌 연동 없이 안전하게",
    },
    {
      icon: "🛡️",
      title: "마이데이터 미연동",
      desc: "개인정보 유출 걱정 없음",
    },
    {
      icon: "📊",
      title: "엑셀 리포트 자동생성",
      desc: "클릭 한 번으로 다운로드",
    },
    {
      icon: "📅",
      title: "월간 자금흐름 분석",
      desc: "수입과 지출을 한눈에",
    },
  ];

  const stats = [
    { value: "", label: "활성 사용자" }, // 2,847명
    { value: "", label: "생성된 리포트" }, // 15,392건
    { value: "", label: "데이터 정확도" }, // 99.8%
    { value: "", label: "사용자 만족도" }, // 4.9/5.0
  ];

  return (
    <section className="bg-[#EAF2F0] py-28">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* 상단 라벨 */}
        <div className="inline-block bg-white text-slate-600 text-sm px-4 py-2 rounded-full mb-8 shadow-sm">
          Why PARFAIT-REPORT
        </div>

        {/* 타이틀 */}
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-16">
          보안을 타협하지 않는
          <br />
          새로운 자산관리 방식
        </h2>

        {/* 기능 영역 */}
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          {features.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md text-2xl mb-4">
                {item.icon}
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 통계 영역 */}
        <div className="grid md:grid-cols-4 gap-12">
          {stats.map((item, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {item.value}
              </div>
              <div className="text-sm text-slate-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
