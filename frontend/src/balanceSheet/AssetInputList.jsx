// src/components/AssetInputList.jsx
import React, { useState } from "react";

export default function AssetInputList() {
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

  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), category: "", amount: "" }]);
  };

  const updateItem = (id, key, value) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="border border-[#393E46] rounded-lg p-4 mt-8">
      {/* 제목 */}
      <div className="text-lg font-bold mb-3 text-center">금융자산 입력</div>

      {/* 리스트 */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-white border border-gray-300 rounded-md p-3"
          >
            {/* 카테고리 선택 */}
            <select
              value={item.category}
              onChange={(e) => updateItem(item.id, "category", e.target.value)}
              className="border px-3 py-2 rounded-md"
            >
              <option value="">항목 선택</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* 금액 */}
            <input
              type="number"
              placeholder="금액"
              value={item.amount}
              onChange={(e) => updateItem(item.id, "amount", e.target.value)}
              className="flex-1 w-32 border px-3 py-2 rounded-md text-right"
            />

            {/* 삭제 */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* 추가 버튼 */}
      <button
        onClick={addItem}
        className="
          w-full mt-4 py-2 border border-[#393E46] rounded-md
          text-[#393E46] font-medium text-center
          hover:bg-white transition
        "
      >
        + 항목 추가
      </button>
    </div>
  );
}
