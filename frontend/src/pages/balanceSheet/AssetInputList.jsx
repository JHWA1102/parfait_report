// src/components/AssetInputList.jsx
import React from "react";
import BankSelect from "./BankSelect";
import CategorySelect from "../../components/common/CategorySelect";

export default function AssetInputList({
  values = [],
  onChange,
  bankList = [],
  securitiesList = [],
}) {
  const baseInputClass =
    "h-11 w-full border border-gray-300 rounded-lg text-sm " +
    "focus:border-slate-400 focus:ring-slate-400 outline-none";

  const CATEGORY_OPTIONS = [
    { value: "예금", detailType: "BANK" },
    { value: "적금", detailType: "BANK" },
    { value: "ISA", detailType: "SECURITIES" },
    { value: "주식", detailType: "SECURITIES" },
    { value: "펀드", detailType: "SECURITIES" },
    { value: "부동산", detailType: "TEXT" },
    { value: "연금", detailType: "TEXT" },
    { value: "대출 (단기)", detailType: "TEXT" },
    { value: "대출 (장기)", detailType: "TEXT" },
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

  const renderDetailInput = (detailType, row, idx) => {
    if (detailType === "BANK" || detailType === "SECURITIES") {
      return (
        <BankSelect
          value={row.detail}
          bankList={detailType === "BANK" ? bankList : securitiesList}
          onChange={(val) => updateRow(idx, "detail", val)}
          className={baseInputClass}
        />
      );
    }

    return (
      <input
        value={row.detail}
        onChange={(e) => updateRow(idx, "detail", e.target.value)}
        placeholder="상세내역"
        className={`${baseInputClass} px-4`}
      />
    );
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
            {/* Category */}
            <CategorySelect
              value={row.category}
              options={CATEGORY_OPTIONS}
              onChange={(val) => updateRow(idx, "category", val)}
              className="w-full md:w-[140px]"
            />

            {/* Detail */}
            <div className="flex-1">
              {renderDetailInput(detailType, row, idx)}
            </div>

            {/* Amount */}
            <div className="relative w-full md:w-[180px]">
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
                  focus:border-slate-400 focus:ring-slate-400
                  outline-none
                "
                placeholder="0"
              />
            </div>

            {/* Delete */}
            <button
              type="button"
              onClick={() => removeRow(idx)}
              className="text-red-500 text-lg px-2 self-end md:self-auto"
            >
              ✕
            </button>
          </div>
        );
      })}

      {/* Add Row */}
      <button
        type="button"
        onClick={addRow}
        className="
          w-full border border-transparent rounded-md py-2 mb-5 cursor-pointer 
          text-black bg-[#f9f9f9] 
          hover:border-[#94A3B8] 
          transition-colors duration-200
        "
      >
        + 항목 추가
      </button>
    </div>
  );
}
