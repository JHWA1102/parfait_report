// src/components/HeroSlider.jsx
import { useEffect, useState } from "react";

const slides = [
  {
    title: "내 재무 상태를\n한 장의 리포트로",
    description: "흩어진 금융 정보를 정리해\n지금 상태를 명확하게 보여줍니다.",
  },
  {
    title: "월급부터 고정비까지\n자동으로 정리",
    description: "복잡한 계산 없이\n한눈에 들어오는 자금 흐름.",
  },
  {
    title: "데이터는 로컬에,\n프라이버시는 그대로",
    description: "어디에도 전송하지 않고\n내 컴퓨터에서만 관리합니다.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="
        relative
        pt-38 pb-12
        bg-gradient-to-b
        from-[#F4F8FB]
        via-[#F7F9FC]
        to-white
      "
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* 중앙 정렬 영역 */}
        <div className="flex flex-col items-center text-center">
          {/* Slide */}
          <div className="relative h-[200px] md:h-[150px] w-full flex items-center justify-center">
            {slides.map((slide, index) => {
              const isActive = index === current;

              return (
                <div
                  key={index}
                  className={`
                    absolute
                    transition-all duration-700 ease-out
                    ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }
                  `}
                >
                  <h1 className="whitespace-pre-line text-[28px] md:text-[38px] font-semibold tracking-tight text-slate-900 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="mt-6 whitespace-pre-line text-[15px] md:text-[16px] text-slate-500 leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Indicators */}
          <div className="mt-12 flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrent(index)}
                className={`
                  h-[6px] w-[6px] rounded-full cursor-pointer transition
                  ${
                    current === index
                      ? "bg-slate-800"
                      : "bg-slate-300 hover:bg-slate-400"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
