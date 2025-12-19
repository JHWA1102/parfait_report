// src/components/AssetInputList.jsx
import React from "react";
import BankSelect from "./BankSelect";

export default function AssetInputList({
  values = [],
  onChange,
  bankList = [],
  securitiesList = [],
}) {
  const baseInputClass =
    "h-11 w-full border border-gray-300 rounded-lg text-sm " +
    "focus:border-indigo-600 focus:ring-indigo-600 outline-none";

  const CATEGORY_OPTIONS = [
    { value: "예금", detailType: "BANK" },
    { value: "적금", detailType: "BANK" },
    { value: "CMA", detailType: "BANK" },
    { value: "주식", detailType: "SECURITIES" },
    { value: "펀드", detailType: "SECURITIES" },
    { value: "부동산", detailType: "TEXT" },
    { value: "연금", detailType: "TEXT" },
    { value: "대출", detailType: "TEXT" },
  ];

  const addRow = () => {
    onChange([...values, { category: "예금", detail: "", amount: "" }]);
  };

  const updateRow = (idx, key, value) => {
    const copy = [...values];
    copy[idx][key] = value;
    onChange(copy);
  };

  const removeRow = (idx) => {
    onChange(values.filter((_, i) => i !== idx));
  };

  const getDetailType = (category) =>
    CATEGORY_OPTIONS.find((c) => c.value === category)?.detailType;

  const formatCurrency = (value) => {
    if (!value) return "";
    return Number(value).toLocaleString("ko-KR");
  };

  const parseCurrency = (value) => {
    return value.replace(/[^\d]/g, "");
  };

  return (
    <div className="space-y-3">
      {values.map((row, idx) => {
        const detailType = getDetailType(row.category);

        return (
          <div
            key={idx}
            className="flex flex-col md:flex-row md:items-center gap-2 bg-white border border-gray-300 rounded-md p-3"
          >
            {/* 항목 */}
            <select
              value={row.category}
              onChange={(e) => updateRow(idx, "category", e.target.value)}
              className="py-3 px-4 block border border-gray-300 rounded-lg text-sm focus:border-indigo-600 focus:ring-indigo-600 outline-none"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.value}
                </option>
              ))}
            </select>
            <div
              className={
                detailType === "TEXT" ? "w-full md:w-[80%]" : "w-full md:flex-1"
              }
            >
              {/* 상세내역 */}
              {detailType === "BANK" || detailType === "SECURITIES" ? (
                <BankSelect
                  value={row.detail}
                  bankList={detailType === "BANK" ? bankList : securitiesList}
                  onChange={(val) => updateRow(idx, "detail", val)}
                  className={`${baseInputClass}`}
                />
              ) : (
                <input
                  value={row.detail}
                  onChange={(e) => updateRow(idx, "detail", e.target.value)}
                  placeholder="상세내역"
                  className={`${baseInputClass} px-4`}
                />
              )}
            </div>

            {/* 금액 */}
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                ₩
              </span>

              <input
                type="text"
                value={formatCurrency(row.amount)}
                onChange={(e) =>
                  updateRow(idx, "amount", parseCurrency(e.target.value))
                }
                className="
                  h-11 w-full pl-8 pr-3
                  border border-gray-300 rounded-lg text-sm
                  text-right
                  focus:border-indigo-600 focus:ring-indigo-600
                  outline-none
                "
                placeholder="0"
              />
            </div>

            {/* 삭제 버튼 ❗ type 지정 */}
            <button
              type="button"
              onClick={() => removeRow(idx)}
              className="text-red-500 self-end md:self-auto"
            >
              ✕
            </button>
          </div>
        );
      })}

      {/* 추가 버튼 ❗ type 지정 */}
      <button
        type="button"
        onClick={addRow}
        className="w-full border rounded-md py-2 hover:bg-gray-50"
      >
        + 항목 추가
      </button>
    </div>
  );
}
