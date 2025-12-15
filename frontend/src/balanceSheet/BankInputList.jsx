import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { getCodeList } from "../api/commonApi";

import BankSelect from "./BankSelect";

export default function BankInputList({ onChangeRows, onChangeBankList }) {
  const [bankList, setBankList] = useState([]);
  const [rows, setRows] = useState([
    { bank: "", amount: "" }, // 기본 1개 라인
  ]);

  // 🔥 1) 처음 한 번만 은행 코드 불러오기
  useEffect(() => {
    loadBanks();
  }, []);

  // 🔥 2) rows 변경될 때 부모에게 전달
  useEffect(() => {
    onChangeRows(rows);
  }, [rows]);

  useEffect(() => {
    onChangeBankList(bankList);
  }, [bankList]);

  const loadBanks = async () => {
    const result = await getCodeList("BANK");
    setBankList(result);
  };

  // 행 추가
  const addRow = () => {
    setRows([...rows, { bank: "", amount: "" }]);
  };

  // 행 제거
  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // 행 값 변경
  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  // 금액 3자리 콤마 자동 처리
  const formatNumber = (value) => {
    const num = value.replace(/[^0-9]/g, ""); // 숫자만 허용
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 콤마 추가
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-center">예금</h2>

      {rows.map((row, index) => (
        <div
          key={index}
          className="flex items-center gap-2 rounded-md bg-white"
        >
          {/* 은행 */}
          <BankSelect
            value={row.bank}
            bankList={bankList}
            onChange={(val) => updateRow(index, "bank", val)}
          />

          {/* 금액 */}
          <div className="flex items-center w-100 border border-gray-300 rounded-md outline-none">
            <span className="text-gray-600 mr-1 ml-3">₩</span>
            <input
              type="text"
              value={formatNumber(row.amount)}
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "");
                updateRow(index, "amount", raw);
              }}
              placeholder="0"
              className="w-full py-1.5 px-2 text-sm text-gray-900"
            />
          </div>

          {/* 삭제 버튼 */}
          {rows.length > 1 && (
            <button
              onClick={() => removeRow(index)}
              className="bg-red-100 text-red-600 p-1 rounded-md hover:bg-red-200 ml-auto"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}

      {/* 추가 버튼 */}
      <button
        onClick={addRow}
        className="inline-flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300"
      >
        <PlusIcon className="h-4 w-4" />
        추가하기
      </button>

      {/* 디버그용 - 선택된 값 */}
      {/* <pre className="bg-gray-100 p-2 text-sm mt-4 rounded-md">
        {JSON.stringify(rows, null, 2)}
      </pre> */}
    </div>
  );
}
