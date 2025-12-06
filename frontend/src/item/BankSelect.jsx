import { useState, useEffect, useRef } from "react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

export default function BankSelect({ value, onChange, bankList }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const filtered =
    query === ""
      ? bankList
      : bankList.filter((b) =>
          b.SUB_NM.toLowerCase().includes(query.toLowerCase())
        );

  const selectedBank = bankList.find((b) => b.SUB_CD === value);

  // 외부 클릭 시 닫힘
  useEffect(() => {
    function handleClickOutside(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-52" ref={inputRef}>
      {/* 검색 인풋 */}
      <div className="relative">
        <input
          type="text"
          className="py-2.5 px-10 block w-full border border-gray-300 rounded-lg text-sm focus:border-indigo-600 focus:ring-indigo-600 outline-none"
          placeholder="은행 검색"
          value={query || (selectedBank?.SUB_NM ?? "")}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />

        {/* 검색 아이콘 */}
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none ps-3.5">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        {/* 드롭다운 아이콘 */}
        <ChevronUpDownIcon className="absolute right-2 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <div className="max-h-60 overflow-auto custom-scroll p-1">
            {/* 검색 결과 없음 */}
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-500">
                검색 결과 없음
              </div>
            )}

            {/* 은행 리스트 */}
            {filtered.map((bank) => (
              <div
                key={bank.SUB_CD}
                onClick={() => {
                  onChange(bank.SUB_CD);
                  setQuery("");
                  setOpen(false);
                }}
                className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center bg-gray-200 rounded-full w-6 h-6 overflow-hidden">
                    <img
                      src={`/logos/${bank.SUB_CD}.png`}
                      onError={(e) => (e.target.style.display = "none")}
                      alt=""
                      className="w-5 h-5"
                    />
                  </div>
                  <span className="text-sm text-gray-800">{bank.SUB_NM}</span>
                </div>

                {/* 선택 체크 */}
                {value === bank.SUB_CD && (
                  <CheckIcon className="h-4 w-4 text-indigo-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
