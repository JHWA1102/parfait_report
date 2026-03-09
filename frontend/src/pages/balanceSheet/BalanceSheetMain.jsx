import React, { useEffect, useState } from "react";
import BankInputList from "./BankInputList";
import { ChevronDownIcon, ArrowDownTrayIcon } from "@heroicons/react/16/solid";
import { getCodeList } from "../../api/commonApi";
import * as XLSX from "xlsx-js-style";
import AssetInputList from "./AssetInputList";

export default function BanlanceSheetMain() {
  const CATEGORY_DETAIL_TYPE_MAP = {
    예금: "BANK",
    적금: "BANK",
    ISA: "SECURITIES",
    주식: "SECURITIES",
    펀드: "SECURITIES",
    부동산: "TEXT",
    연금: "TEXT",
    단기부채: "TEXT",
    장기부채: "TEXT",
  };

  // 🔹 입력된 행 데이터 (은행 + 금액)
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
    /* =====================================================
     공통 맵 / 헬퍼
  ===================================================== */
    const CATEGORY_DETAIL_TYPE_MAP = {
      예금: "BANK",
      적금: "BANK",
      ISA: "SECURITIES",
      주식: "SECURITIES",
      펀드: "SECURITIES",
      부동산: "TEXT",
      연금: "TEXT",
      단기부채: "TEXT",
      장기부채: "TEXT",
    };

    const CATEGORY_COLOR_MAP = {
      예금: "E8F0FE",
      적금: "E8F0FE",
      ISA: "E8F0FE",

      주식: "FFF4E5",
      펀드: "FFF4E5",

      부동산: "E9F7EF",
      연금: "E9F7EF",

      "대출 (단기)": "FDECEA",
      "대출 (장기)": "FADBD8",
    };

    const sum = (arr) => arr.reduce((a, b) => a + b.amount, 0);

    /* =====================================================
     Sheet1 : 상세 입력값
  ===================================================== */

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

    const sheet1Data = [
      ["상세 입력값"],
      ["* 달러의 경우 원화환산금액을 입력"],
      [],
      ["항목", "상세내역", "금액"],
      ...sheet1Rows,
    ];

    const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);

    ws1["!cols"] = [{ wch: 15 }, { wch: 25 }, { wch: 15 }];
    ws1["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 2 } },
    ];

    // 제목
    ws1["A1"].s = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: "center", vertical: "center" },
    };
    ws1["A2"].s = {
      font: { italic: true, color: { rgb: "666666" } },
      alignment: { horizontal: "center", vertical: "center" },
    };

    // 헤더
    ["A4", "B4", "C4"].forEach((cell) => {
      ws1[cell].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "D9D9D9" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        },
      };
    });

    // 데이터
    sheet1Rows.forEach((row, i) => {
      const r = i + 4;
      const color = CATEGORY_COLOR_MAP[row[0]];

      for (let c = 0; c < 3; c++) {
        const ref = XLSX.utils.encode_cell({ r, c });
        ws1[ref].s = {
          fill: { fgColor: { rgb: color } },
          alignment: {
            horizontal: c === 2 ? "right" : "center",
            vertical: "center",
          },
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };
        if (c === 2) ws1[ref].z = "#,##0";
      }
    });

    /* =====================================================
     Sheet2 : 재무제표(B/S)
  ===================================================== */

    const BS_GROUP_MAP = {
      예금: "현금성자산",
      적금: "현금성자산",
      ISA: "현금성자산",

      주식: "투자자산",
      펀드: "투자자산",
      부동산: "투자자산",

      연금: "은퇴자산",

      "대출 (단기)": "단기부채",
      "대출 (장기)": "장기부채",
    };

    const bs = {
      현금성자산: [],
      투자자산: [],
      은퇴자산: [],
      단기부채: [],
      장기부채: [],
    };

    const getBsFillColor = (row, colIndex) => {
      const assetRaw = row[0] || "";
      const debtRaw = row[2] || "";

      const assetLabel = typeof assetRaw === "string" ? assetRaw : "";
      const debtLabel = typeof debtRaw === "string" ? debtRaw : "";

      // 자산 영역
      if (colIndex <= 1) {
        if (assetLabel.includes("현금성")) return "E8EEF9";
        if (assetLabel.includes("투자")) return "E8EEF9";
        if (assetLabel.includes("은퇴")) return "E8EEF9";
        if (assetLabel === "자산 합계") return "E3EAF6";
      }

      // 부채 영역
      if (colIndex >= 2) {
        if (debtLabel.includes("단기 부채")) return "FCEFE3";
        if (debtLabel.includes("장기 부채")) return "FCEFE3";
        if (debtLabel === "부채 합계") return "F9E4D8";
        if (debtLabel.includes("자본")) return "E6F4EA";
      }

      return null;
    };

    assetValues.forEach((v) => {
      const group = BS_GROUP_MAP[v.category];
      if (!group) return;

      let name = v.category;

      if (CATEGORY_DETAIL_TYPE_MAP[v.category] === "BANK") {
        name = bankList.find((b) => b.SUB_CD === v.detail)?.SUB_NM || name;
      }

      if (CATEGORY_DETAIL_TYPE_MAP[v.category] === "SECURITIES") {
        name =
          securitiesList.find((s) => s.SUB_CD === v.detail)?.SUB_NM || name;
      }

      bs[group].push({ label: name, amount: Number(v.amount || 0) });
    });

    const assetTotal = sum(bs.현금성자산) + sum(bs.투자자산) + sum(bs.은퇴자산);
    const debtTotal = sum(bs.단기부채) + sum(bs.장기부채);
    const netAsset = assetTotal - debtTotal;

    const maxCashRows = Math.max(bs.현금성자산.length, bs.단기부채.length);

    const cashRows = Array.from({ length: maxCashRows }).map((_, i) => [
      bs.현금성자산[i]?.label || "",
      bs.현금성자산[i]?.amount || "",
      bs.단기부채[i]?.label || "",
      bs.단기부채[i]?.amount || "",
    ]);

    const maxInvestRows = Math.max(bs.투자자산.length, bs.장기부채.length);

    const investRows = Array.from({ length: maxInvestRows }).map((_, i) => [
      bs.투자자산[i]?.label || "",
      bs.투자자산[i]?.amount || "",
      bs.장기부채[i]?.label || "",
      bs.장기부채[i]?.amount || "",
    ]);

    const sheet2Data = [
      ["재무제표(B/S)", "", "", ""],
      ["항목", "금액", "항목", "금액"],

      ["현금성 자산", "", "단기 부채", ""],
      ...cashRows,
      ["소계", sum(bs.현금성자산), "소계", sum(bs.단기부채)],

      ["투자 자산", "", "장기 부채", ""],
      ...investRows,
      ["소계", sum(bs.투자자산), "", ""],

      ["은퇴 자산", "", "", ""],
      ...bs.은퇴자산.map((v) => [v.label, v.amount, "", ""]),
      ["소계", sum(bs.은퇴자산), "소계", sum(bs.장기부채)],

      ["자산 합계", "", "부채 합계", ""],
      ["", "", debtTotal, ""],
      [assetTotal, "", "자본(순자산)", ""],
      ["", "", netAsset, ""],
    ];

    const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);

    const range = XLSX.utils.decode_range(ws2["!ref"]);

    for (let r = range.s.r; r <= range.e.r; r++) {
      const row = sheet2Data[r];
      if (!row) continue;

      // 라벨 판단
      const rawLabel = row[0] || row[2] || "";
      const label = typeof rawLabel === "string" ? rawLabel : "";

      const isDetailRow =
        label &&
        !label.includes("자산") &&
        !label.includes("부채") &&
        !label.includes("소계") &&
        !label.includes("합계") &&
        !label.includes("자본");

      const isTotalLabelRow =
        label.includes("자산 합계") ||
        label.includes("부채 합계") ||
        label.includes("자본(순자산)");

      for (let c = range.s.c; c <= range.e.c; c++) {
        const cellRef = XLSX.utils.encode_cell({ r, c });
        const cell = ws2[cellRef];
        if (!cell) continue;

        const fillColor = getBsFillColor(row, c);

        // 공통 스타일
        cell.s = {
          alignment: {
            horizontal: cell.t === "n" ? "right" : "center",
            vertical: "center",
          },
          font: {
            bold: !isDetailRow,
          },
          fill: fillColor ? { fgColor: { rgb: fillColor } } : undefined,
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };

        // 👉 현재 행의 숫자 컬럼 콤마
        if (cell.t === "n") {
          cell.z = "#,##0";
        }

        // 👉 합계/자본 라벨이면 다음 행 숫자에 콤마
        if (isTotalLabelRow) {
          const nextCellRef = XLSX.utils.encode_cell({ r: r + 1, c });
          const nextCell = ws2[nextCellRef];

          if (nextCell && nextCell.t === "n") {
            nextCell.z = "#,##0";
          }
        }
      }
    }

    ws2["!cols"] = [{ wch: 20 }, { wch: 18 }, { wch: 20 }, { wch: 18 }];

    ws2["!merges"] = ws2["!merges"] || [];

    ws2["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];

    sheet2Data.forEach((row, r) => {
      const left = row[0];
      const right = row[2];

      // 왼쪽 섹션 제목
      if (
        left === "현금성 자산" ||
        left === "투자 자산" ||
        left === "은퇴 자산"
      ) {
        ws2["!merges"].push({
          s: { r, c: 0 },
          e: { r, c: 1 },
        });
      }

      // 오른쪽 섹션 제목 (값이 있을 때만!)
      if (
        right === "단기 부채" ||
        right === "장기 부채" ||
        right === "부채 합계" ||
        right === "자본(순자산)"
      ) {
        ws2["!merges"].push({
          s: { r, c: 2 },
          e: { r, c: 3 },
        });
      }
    });

    // assetTotal 행 index를 알아야 함
    // 병합 배열 보장

    // "자산 합계" 기준 row
    const baseRow = sheet2Data.findIndex((r) => r[0] === "자산 합계");

    if (baseRow !== -1) {
      /* =========================
     자산 합계
  ========================= */

      // 라벨 (A,B) 2row
      ws2["!merges"].push({
        s: { r: baseRow, c: 0 },
        e: { r: baseRow + 1, c: 1 },
      });

      // 금액 assetTotal (A,B) 2row
      ws2["!merges"].push({
        s: { r: baseRow + 2, c: 0 },
        e: { r: baseRow + 3, c: 1 },
      });

      /* =========================
     부채 합계 (금액만 1row)
  ========================= */

      ws2["!merges"].push({
        s: { r: baseRow + 1, c: 2 }, // debtTotal 있는 row
        e: { r: baseRow + 1, c: 3 },
      });

      /* =========================
     자본(순자산) (금액만 1row)
  ========================= */

      ws2["!merges"].push({
        s: { r: baseRow + 3, c: 2 }, // netAsset 있는 row
        e: { r: baseRow + 3, c: 3 },
      });
    }

    // 제목
    ws2["A1"].s = {
      font: { bold: true, sz: 16 },
      alignment: { horizontal: "center", vertical: "center" },
    };

    /* =====================================================
     Workbook
  ===================================================== */

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "자산입력내역");
    XLSX.utils.book_append_sheet(wb, ws2, "자산현황");

    XLSX.writeFile(wb, "재무상태표.xlsx");
  };

  return (
    <div>
      <div className="w-full max-w-2xl mx-auto mt-10 ">
        <AssetInputList
          values={assetValues}
          onChange={setAssetValues}
          bankList={bankList}
          securitiesList={securitiesList}
        />
        <button
          onClick={exportToExcel}
          className="btn-base flex items-center gap-2 px-4 py-2 cursor-pointer mb-10"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          <span>엑셀 다운로드</span>
        </button>
      </div>
    </div>
  );
}
