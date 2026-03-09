export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-slate-700">
      <h1 className="text-3xl font-bold mb-10">이용약관</h1>

      <h2 className="text-xl font-semibold mb-4">제1조 (목적)</h2>
      <p className="mb-6">
        본 약관은 Parfait Report(이하 "회사")가 제공하는 서비스의 이용과
        관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로
        합니다.
      </p>

      <h2 className="text-xl font-semibold mb-4">제2조 (서비스 제공)</h2>
      <p className="mb-6">
        회사는 이용자에게 자산 관리 및 재무 분석 관련 서비스를 제공합니다.
        서비스의 내용은 회사의 정책에 따라 변경될 수 있습니다.
      </p>

      <h2 className="text-xl font-semibold mb-4">제3조 (이용자의 의무)</h2>

      <ul className="list-disc ml-6 mb-6">
        <li>서비스 이용 시 관련 법령을 준수해야 합니다.</li>
        <li>서비스의 정상적인 운영을 방해하는 행위를 해서는 안 됩니다.</li>
        <li>타인의 정보를 도용해서는 안 됩니다.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">
        제4조 (서비스 변경 및 중단)
      </h2>

      <p className="mb-6">
        회사는 서비스 운영상 필요한 경우 서비스의 내용을 변경하거나 중단할 수
        있습니다.
      </p>

      <h2 className="text-xl font-semibold mb-4">제5조 (면책조항)</h2>

      <p className="mb-6">
        회사는 서비스 이용 과정에서 발생한 손해에 대해 법률에서 허용하는 범위
        내에서 책임을 제한할 수 있습니다.
      </p>

      <p className="mt-10 text-sm text-slate-400">
        본 약관은 2026년 3월 7일부터 적용됩니다.
      </p>
    </div>
  );
}
