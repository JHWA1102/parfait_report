import { useState } from "react";

export default function TestimonialSection() {
  const testimonials = [
    {
      rating: 4.9,
      content:
        "마이데이터 연동이 불안해서 사용을 망설였는데, PARFAIT-REPORT는 제가 직접 입력하니 안심이 됩니다. 엑셀 리포트도 깔끔하게 나와서 매달 자산 정리가 즐거워졌어요.",
      name: "김지현",
      role: "IT 기업 재직 · 3개월 사용",
    },
    {
      rating: 5.0,
      content:
        "개인사업자로서 사업 지출과 개인 지출을 분리 관리하는 게 어려웠는데, 이 서비스 덕분에 한눈에 정리됩니다. 세무사 상담 때도 큰 도움이 됐어요.",
      name: "박성훈",
      role: "프리랜서 디자이너 · 6개월 사용",
    },
    {
      rating: 4.8,
      content:
        "수동 입력이라 번거로울 줄 알았는데 오히려 통제감이 생겨서 좋았습니다. 제 돈의 흐름을 제대로 이해하게 됐어요.",
      name: "이수민",
      role: "온라인 쇼핑몰 운영 · 4개월 사용",
    },
    {
      rating: 4.9,
      content:
        "월간 자금 흐름 리포트가 정말 유용합니다. 단순 가계부가 아니라 경영 도구라는 느낌이 들어요.",
      name: "최준호",
      role: "소규모 학원 운영 · 5개월 사용",
    },
  ];

  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const next = () =>
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  const current = testimonials[index];

  return (
    <section className="bg-[#F4F6F8] py-28">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* 제목 */}
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-16">
          "사용자들의 진짜 이야기"
        </h2>

        {/* 후기 카드 */}
        <div className="bg-white rounded-3xl shadow-md p-10 text-left relative">
          {/* 평점 */}
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full mb-6">
            ⭐ {current.rating}
          </div>

          {/* 내용 */}
          <p className="text-slate-700 text-lg leading-relaxed mb-8">
            "{current.content}"
          </p>

          {/* 사용자 정보 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600">
              {current.name.charAt(0)}
            </div>

            <div>
              <div className="font-medium text-slate-900">{current.name}</div>
              <div className="text-sm text-slate-500">{current.role}</div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="absolute bottom-8 right-8 flex gap-3">
            <button onClick={prev} className="btn-base">
              ←
            </button>

            <button onClick={next} className="btn-base">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
