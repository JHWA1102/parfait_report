// src/components/AssetInputList.jsx

import React from "react";

export default function AssetInputList({ values, onChange }) {
  const categories = [
    "적금",
    "CMA",
    "노란우산",
    "펀드",
    "주식",
    "금 KRX",
    "아파트",
    "오피스텔",
    "빌라",
    "거주용부동산",
    "주택청약통장",
    "연금저축",
    "개인연금",
    "대출금",
    "보증금",
    "보증금(전세)",
    "아파트대출",
  ];

  // 입력값 변경 처리
  const handleInput = (category, value) => {
    onChange({
      ...values,
      [category]: value,
    });
  };

  return (
    <div className="mt-4 space-y-4">
      {categories.map((item) => (
        <div key={item} className="flex items-center">
          {/* 제목 */}
          <label className="text-sm font-medium text-gray-700 w-40">
            {item}
          </label>

          {/* 금액 입력 */}
          <input
            type="number"
            placeholder="0"
            value={values[item] || ""}
            onChange={(e) => handleInput(item, e.target.value)}
            className="
              border border-gray-300 rounded-md px-3 py-2 
              w-48 text-right
              focus:outline-none focus:ring-2 focus:ring-blue-300
            "
          />
        </div>
      ))}
    </div>
  );
}
