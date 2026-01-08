import { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/16/solid";
import * as XLSX from "xlsx-js-style";

export default function MonthlyFinanceMain() {
  const [salary, setSalary] = useState("");
  const [fixedCosts, setFixedCosts] = useState([
    { description: "", amount: "" },
  ]);

  const addFixedCost = () => {
    setFixedCosts([...fixedCosts, { description: "", amount: "" }]);
  };

  const updateFixedCost = (index, field, value) => {
    const next = [...fixedCosts];
    next[index] = {
      ...next[index],
      [field]: value,
    };
    setFixedCosts(next);
  };

  const exportToExcel = () => {
    const totalFixedCost = fixedCosts.reduce(
      (sum, cost) => sum + Number(cost.amount || 0),
      0
    );

    const remainingMoney = Number(salary || 0) - totalFixedCost;

    const rows = [];

    rows.push(["월급", Number(salary)]);
    rows.push([]);
    rows.push(["고정비 설명", "금액"]);

    fixedCosts.forEach((cost) => {
      if (cost.description && cost.amount) {
        rows.push([cost.description, Number(cost.amount)]);
      }
    });

    rows.push(["잉여자금", remainingMoney]);

    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    /* =========================
     공통 스타일
  ========================= */
    const baseCellStyle = {
      alignment: {
        vertical: "center",
        horizontal: "center",
      },
      border: {
        top: { style: "thin", color: { rgb: "CBD5E1" } },
        bottom: { style: "thin", color: { rgb: "CBD5E1" } },
        left: { style: "thin", color: { rgb: "CBD5E1" } },
        right: { style: "thin", color: { rgb: "CBD5E1" } },
      },
    };

    const moneyFormat = {
      numFmt: "#,##0",
    };

    /* =========================
     데이터 셀 스타일
     (헤더 제외)
  ========================= */
    Object.keys(worksheet).forEach((cell) => {
      if (!cell.startsWith("A") && !cell.startsWith("B")) return;
      if (cell.startsWith("!")) return;
      if (["A1", "B1", "A3", "B3"].includes(cell)) return;

      const isNumber = typeof worksheet[cell]?.v === "number";

      worksheet[cell].s = {
        ...baseCellStyle,
        ...(isNumber ? moneyFormat : {}),
      };
    });

    /* =========================
     헤더 스타일 (마지막에 확정)
  ========================= */

    // 월급 헤더 (A1, B1)
    worksheet["A1"].s = {
      ...baseCellStyle,
      font: { bold: true },
      fill: { fgColor: { rgb: "E8EEF9" } },
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    };

    worksheet["B1"].s = {
      ...baseCellStyle,
      font: { bold: true },
      fill: { fgColor: { rgb: "E8EEF9" } },
      numFmt: "#,##0",
    };

    // 고정비 헤더 (A3, B3)
    worksheet["A3"].s = {
      ...baseCellStyle,
      font: { bold: true },
      fill: { fgColor: { rgb: "E5E7EB" } },
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    };

    worksheet["B3"].s = {
      ...baseCellStyle,
      font: { bold: true },
      fill: { fgColor: { rgb: "E5E7EB" } },
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    };

    const remainFillColor = remainingMoney < 0 ? "FEE2E2" : "E6F4EA"; // red-100 / green-100

    const remainStyle = {
      ...baseCellStyle,
      font: { bold: true },
      fill: {
        fgColor: { rgb: remainFillColor },
      },
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    };

    const remainRowIndex = rows.length; // 1-based row index

    worksheet[`A${remainRowIndex}`].s = remainStyle;
    worksheet[`B${remainRowIndex}`].s = {
      ...remainStyle,
      numFmt: "#,##0",
    };

    /* =========================
     컬럼 너비
  ========================= */
    worksheet["!cols"] = [{ wch: 24 }, { wch: 14 }];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "월간 자금관리");

    XLSX.writeFile(workbook, "월간_자금관리.xlsx");
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    return Number(value).toLocaleString("ko-KR");
  };

  return (
    <div>
      <div className="w-full w-full max-w-2xl mx-auto mt-10">
        <div className="border border-gray-300 rounded-md p-6 bg-white">
          {/* 월급 */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              월급
            </label>

            <span className="absolute left-3 top-1/2 translate-y-0.5 text-gray-500 text-sm pointer-events-none">
              ₩
            </span>

            <input
              type="text"
              value={formatCurrency(salary)}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^\d]/g, "");
                setSalary(raw);
              }}
              placeholder="예: 3000000"
              className="w-full rounded-lg border border-gray-300 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* 고정비 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              고정비
            </label>

            {fixedCosts.map((cost, index) => (
              <div key={index} className="flex gap-2 mb-2">
                {/* 설명 */}
                <input
                  type="text"
                  value={cost.description}
                  onChange={(e) =>
                    updateFixedCost(index, "description", e.target.value)
                  }
                  placeholder="예: 월세, 통신비"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* 금액 + ₩ */}
                <div className="relative w-100">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                    ₩
                  </span>
                  <input
                    type="text"
                    value={formatCurrency(cost.amount)}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^\d]/g, "");
                      updateFixedCost(index, "amount", raw);
                    }}
                    placeholder="금액"
                    className="w-full rounded-lg border border-gray-300 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addFixedCost}
              className="mt-2 border rounded-md py-2 hover:bg-gray-50"
            >
              + 고정비 추가
            </button>
          </div>

          <button
            onClick={exportToExcel}
            className="inline-flex items-center gap-1 bg-green-500 px-3 py-2 rounded-md hover:bg-green-600"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            엑셀 다운로드
          </button>
        </div>
      </div>
    </div>
  );
}
