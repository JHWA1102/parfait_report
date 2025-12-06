import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./Login";
import { ChevronDownIcon, ArrowDownTrayIcon } from "@heroicons/react/16/solid";
import { getCodeList } from "./api/commonApi";
import BankInputList from "./item/BankInputList";
import * as XLSX from "xlsx";

function App() {
  // 🔹 코드 리스트 (은행 코드 등)
  const [codes, setCodes] = useState([]);

  // 🔹 입력된 행 데이터 (은행 + 금액)
  const [rows, setRows] = useState([]);
  const [bankList, setBankList] = useState([]);

  useEffect(() => {
    loadCodeList();
  }, []);

  const loadCodeList = async () => {
    try {
      const result = await getCodeList("BANK"); // 원하는 mst_code 값 넣기
      setCodes(result);
    } catch (error) {
      console.error("코드 조회 오류:", error);
    }
  };

  // 🔥 엑셀 다운로드
  const exportToExcel = () => {
    // 숫자로 유지 (콤마 X)
    const converted = rows.map((item) => {
      const bank = bankList.find((b) => b.SUB_CD === item.bank);
      return {
        은행명: bank ? bank.SUB_NM : "",
        금액: Number(item.amount || 0), // 🔥 숫자 유지
      };
    });

    // 총합 계산
    const totalAmount = converted.reduce((sum, row) => sum + row.금액, 0);

    // 합계 행 추가
    converted.push({
      은행명: "합계",
      금액: totalAmount,
    });

    // 엑셀 시트 생성
    const ws = XLSX.utils.json_to_sheet(converted);

    // ---- 📌 스타일 적용 시작 ----

    const range = XLSX.utils.decode_range(ws["!ref"]);
    const lastRow = range.e.r; // 마지막 행 index

    for (let R = range.s.r; R <= lastRow; R++) {
      for (let C = range.s.c; C <= range.e.c; C++) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = ws[cellRef];
        if (!cell) continue;

        // 🔥 숫자 포맷 적용 (#,###)
        if (C === 1 && R < lastRow) {
          cell.z = "#,##0";
        }

        // 🔥 합계 행 회색 배경
        if (R === lastRow) {
          cell.s = {
            fill: {
              fgColor: { rgb: "DDDDDD" }, // 연한 회색
            },
            font: { bold: true },
          };

          cell.z = "#,##0"; // 합계 금액도 콤마 표시
        }
      }
    }

    // ---- 📌 스타일 적용 끝 ----

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "예금내역");

    XLSX.writeFile(wb, "deposit.xlsx");
  };

  return (
    <>
      {/* <Login /> */}
      <div>
        <Header />
        {/* <Sidebar /> */}

        <main className="pt-15">
          <div>
            {/* 예금 */}
            <div className="w-full w-full max-w-2xl mx-auto mt-10">
              <BankInputList
                onChangeRows={setRows}
                onChangeBankList={setBankList}
              />
              <button
                onClick={exportToExcel}
                className="inline-flex items-center gap-1 bg-green-500 px-3 py-2 rounded-md hover:bg-green-600 mt-5"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                엑셀 다운로드
              </button>
            </div>
            {/* 🔥 엑셀 다운로드 버튼 */}
          </div>
          {/* 적금 */}
        </main>
      </div>
    </>
  );
}

export default App;
