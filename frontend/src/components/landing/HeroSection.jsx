import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-[#f4f6f8] flex items-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-50 items-center">
        {/* LEFT TEXT */}
        <div>
          <div className="inline-flex items-center bg-slate-200 text-slate-700 text-sm px-3 py-1 rounded-full mb-6">
            🔒 보안 우선 자산관리
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            당신이 직접 입력하는
            <br />
            안전한 자산관리
            <br />
            <span className="text-orange-400">PARFAIT-REPORT</span>
          </h1>
        </div>

        {/* RIGHT PANEL */}
        <div className="relative flex justify-center perspective-[1200px]">
          <motion.div
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.03, 1],
              rotateX: [0, 3, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[420px] rounded-3xl shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src="/images/dashboard-preview.png"
              alt="Dashboard Preview"
              className="rounded-2xl w-full max-h-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
