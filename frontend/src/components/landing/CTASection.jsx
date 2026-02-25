export default function CTASection() {
  return (
    <section className="relative bg-[#1E293B] text-white py-32 overflow-hidden">
      {/* 점 패턴 배경 */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* 타이틀 */}
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-10 tracking-wide">
          START YOUR FINANCIAL
          <br />
          JOURNEY TODAY
        </h2>
      </div>
    </section>
  );
}
