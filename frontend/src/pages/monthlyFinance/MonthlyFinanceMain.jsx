// 예: src/pages/MonthlyFinanceMain.jsx
import React from "react";

export default function MonthlyFinanceMain() {
  // 너가 이미 쓰고 있는 state에 맞게 연결하면 됨
  const month = "2026-01";
  const income = { salary: 2800000, extra: 200000 };
  const fixedCosts = [
    { name: "월세", amount: 700000 },
    { name: "보험", amount: 150000 },
    { name: "통신비", amount: 55000 },
  ];

  return (
    <div className="p-4">
      {/* ... 메인 화면 ... */}
      <button className="px-4 py-2 rounded-xl bg-[#393E46] text-white">
        엑셀 다운로드
      </button>
    </div>
  );
}
