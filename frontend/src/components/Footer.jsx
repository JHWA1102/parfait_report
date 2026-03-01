export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* 상단 영역 */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* 좌측 브랜드 영역 */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white text-lg">
                📊
              </div>
              <span className="text-lg font-semibold text-white">
                PARFAIT REPORT
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              보안을 최우선으로 하는 자산관리 플랫폼
              <br />
              당신의 금융 데이터는 오직 당신의 것입니다
            </p>

            {/* 뉴스레터 */}
            <div>
              <h4 className="text-white font-medium mb-4">
                월간 자산관리 팁 받기
              </h4>

              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="이메일 주소 입력"
                  className="bg-transparent border-b border-slate-600 focus:border-slate-400 outline-none py-2 text-sm w-full"
                />

                <button className="border border-slate-500 px-7 py-1 rounded-full text-sm hover:bg-slate-700 transition cursor-pointer">
                  구독하기
                </button>
              </div>
            </div>
          </div>

          {/* 우측 메뉴 영역 */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-12">
            {/* 서비스 */}
            <div>
              <h4 className="text-white font-semibold mb-4">서비스</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="hover:text-white cursor-pointer">
                  내 자산 파악하기
                </li>
                <li className="hover:text-white cursor-pointer">
                  월간자금리포트
                </li>
                <li className="hover:text-white cursor-pointer">피드</li>
                <li className="hover:text-white cursor-pointer">요금제</li>
              </ul>
            </div>

            {/* 회사 */}
            <div>
              <h4 className="text-white font-semibold mb-4">회사</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="hover:text-white cursor-pointer">회사 소개</li>
                <li className="hover:text-white cursor-pointer">블로그</li>
                <li className="hover:text-white cursor-pointer">채용</li>
                <li className="hover:text-white cursor-pointer">문의하기</li>
              </ul>
            </div>

            {/* 법적 고지 */}
            <div>
              <h4 className="text-white font-semibold mb-4">법적 고지</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="hover:text-white cursor-pointer">이용약관</li>
                <li className="hover:text-white cursor-pointer">
                  개인정보처리방침
                </li>
                <li className="hover:text-white cursor-pointer">보안정책</li>
                <li className="hover:text-white cursor-pointer">쿠키 정책</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 하단 라인 */}
        <div className="border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} PARFAIT-REPORT. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
