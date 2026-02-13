// src/components/ExplainSection.jsx
export default function ExplainSection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          {/* 문제 제기 */}
          <img
            src="/images/reportIcon.png"
            alt="리포트 아이콘"
            className="h-[100px] w-[140px] mx-auto"
          />
          <p className="text-[20px] md:text-[24px] font-semibold text-slate-900 tracking-tight">
            내 재무 상태,
            <br className="md:hidden" /> 한눈에 파악하기 어려우셨죠?
          </p>

          {/* 해결 제안 */}
          <p className="mt-6 text-[16px] md:text-[18px] text-slate-600 leading-relaxed">
            Parfait Report는
            <br />
            복잡한 금융 정보를 깔끔한 리포트로 정리해드립니다.
          </p>
        </div>
      </div>
    </section>
  );
}
