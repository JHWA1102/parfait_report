export default function MainPage() {
  return (
    <div className="pt-10 md:pt-0">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 text-center bg-[#F7F7F7]">
        <span className="text-sm tracking-wide text-[#929AAB] mb-4">
          PRIVATE FINANCIAL REPORT
        </span>

        <h1 className="text-3xl md:text-4xl font-semibold text-[#393E46] leading-snug mb-6">
          만들어보세요.
          <br />
          <span className="font-bold">나만의 자산관리 보고서</span>
        </h1>

        <p className="max-w-xl text-base md:text-lg text-[#555] leading-relaxed mb-10">
          외부 유출 걱정 없이 당신의 자산 흐름을 한눈에 정리하고, 오직 나를 위한
          보고서를 만들어보세요.
        </p>

        <button className="px-8 py-3 rounded-lg bg-[#393E46] text-white font-medium hover:bg-[#2f343a] transition">
          보고서 만들기
        </button>
      </div>
    </div>
  );
}
