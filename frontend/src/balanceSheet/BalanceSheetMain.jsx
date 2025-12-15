import React, { useEffect, useState } from "react";
import BankInputList from "./BankInputList";
import { ChevronDownIcon, ArrowDownTrayIcon } from "@heroicons/react/16/solid";
import { getCodeList } from "../api/commonApi";
import * as XLSX from "xlsx";
import AssetInputList from "./AssetInputList";

export default function BanlanceSheetMain() {
  const CATEGORY_DETAIL_TYPE_MAP = {
    예금: "BANK",
    적금: "BANK",
    CMA: "BANK",
    주식: "SECURITIES",
    펀드: "SECURITIES",
    부동산: "TEXT",
    연금: "TEXT",
    대출: "TEXT",
  };

  // 🔹 코드 리스트 (은행 코드 등)
  const [codes, setCodes] = useState([]);

  // 🔹 입력된 행 데이터 (은행 + 금액)
  const [rows, setRows] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [securitiesList, setSecuritiesList] = useState([]);

  // rows, bankList는 기존 state
  const [assetValues, setAssetValues] = useState([]);

  useEffect(() => {
    loadCodeList();
  }, []);

  const loadCodeList = async () => {
    try {
      const bankResult = await getCodeList("BANK");
      const securitiesResult = await getCodeList("SECURITIES");

      // result 구조에 따라 둘 중 하나
      setBankList(bankResult); // ← result가 배열이면
      setSecuritiesList(securitiesResult);
    } catch (error) {
      console.error("코드 조회 오류:", error);
    }
  };

  // 🔥 엑셀 다운로드
  const exportToExcel = () => {
    /* ---------- Sheet1 ---------- */
    const CATEGORY_COLOR_MAP = {
      예금: "E8F0FE",
      적금: "E8F0FE",
      CMA: "E8F0FE",
      주식: "FFF4E5",
      펀드: "FFF4E5",
      부동산: "E9F7EF",
      연금: "E9F7EF",
      대출: "FDECEA",
    };

    /* ✅ 1️⃣ 먼저 sheet1Rows 생성 */
    const sheet1Rows = assetValues.map((v) => {
      const detailType = CATEGORY_DETAIL_TYPE_MAP[v.category];

      let detailName = v.detail;

      if (detailType === "BANK") {
        detailName = bankList.find((b) => b.SUB_CD === v.detail)?.SUB_NM || "";
      }

      if (detailType === "SECURITIES") {
        detailName =
          securitiesList.find((s) => s.SUB_CD === v.detail)?.SUB_NM || "";
      }

      return [v.category, detailName, Number(v.amount || 0)];
    });

    /* ✅ 2️⃣ 그 다음 sheet1Data에서 사용 */
    const sheet1Data = [
      ["상세 입력값"],
      ["* 달러의 경우 원화환산금액을 입력"],
      [],
      ["항목", "상세내역", "금액"],
      ...sheet1Rows,
    ];

    const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);

    /* 컬럼 너비 */
    ws1["!cols"] = [{ wch: 15 }, { wch: 25 }, { wch: 15 }];

    /* 병합 */
    ws1["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 2 } },
    ];

    /* 스타일 */
    sheet1Rows.forEach((row, i) => {
      const excelRow = i + 4;
      const color = CATEGORY_COLOR_MAP[row[0]];

      for (let c = 0; c < 3; c++) {
        const cellRef = XLSX.utils.encode_cell({ r: excelRow, c });

        if (!ws1[cellRef]) continue;

        ws1[cellRef].s = {
          fill: {
            fgColor: { rgb: color },
          },
          alignment: {
            vertical: "center",
            horizontal: c === 2 ? "right" : "center",
          },
        };

        if (c === 2) ws1[cellRef].z = "#,##0";
      }
    });

    ws1["A1"].s = {
      font: { bold: true, sz: 14 },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
    };

    ws1["A2"].s = {
      font: { italic: true, color: { rgb: "666666" } },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
    };

    ["A4", "B4", "C4"].forEach((cell) => {
      ws1[cell].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "D9D9D9" } },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
      };
    });

    /* ---------- Sheet2 ---------- */
    const CATEGORY_GROUP_MAP = {
      예금: "현금성자산",
      적금: "현금성자산",
      CMA: "현금성자산",
      주식: "투자자산",
      펀드: "투자자산",
      부동산: "기타자산",
      연금: "기타자산",
      대출: "부채",
    };

    const summary = {
      현금성자산: 0,
      투자자산: 0,
      기타자산: 0,
      부채: 0,
    };

    assetValues.forEach((v) => {
      const group = CATEGORY_GROUP_MAP[v.category];
      if (!group) return;
      summary[group] += Number(v.amount || 0);
    });

    const totalAsset = summary.현금성자산 + summary.투자자산 + summary.기타자산;

    const totalDebt = summary.부채;
    const netAsset = totalAsset - totalDebt;

    const sheet2Data = [
      ["자산", "", "부채", ""],
      ["현금성 자산", summary.현금성자산, "부채", summary.부채],
      ["투자자산", summary.투자자산, "", ""],
      ["기타자산", summary.기타자산, "", ""],
      ["", "", "", ""],
      ["자산 합계", totalAsset, "부채 합계", totalDebt],
      ["", "", "자본(순자산)", netAsset],
    ];

    const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);

    ws2["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
      { s: { r: 0, c: 2 }, e: { r: 0, c: 3 } },
    ];

    ws2["!cols"] = [{ wch: 20 }, { wch: 18 }, { wch: 20 }, { wch: 18 }];

    /* ---------- Workbook ---------- */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "자산입력내역");
    XLSX.utils.book_append_sheet(wb, ws2, "자산현황");

    XLSX.writeFile(wb, "재무상태표.xlsx");
  };

  return (
    <div>
      <div className="w-full w-full max-w-2xl mx-auto mt-10">
        {/* <BankInputList onChangeRows={setRows} onChangeBankList={setBankList} /> */}
        <AssetInputList
          values={assetValues}
          onChange={setAssetValues}
          bankList={bankList}
          securitiesList={securitiesList}
        />
        <button
          onClick={exportToExcel}
          className="inline-flex items-center gap-1 bg-green-500 px-3 py-2 rounded-md hover:bg-green-600 mt-5"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          엑셀 다운로드
        </button>
      </div>
    </div>
  );
}
