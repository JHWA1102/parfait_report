import { useEffect, useState } from "react";
import { saveTransaction } from "../../api/transacionApi";
import { getCodeList } from "../../api/commonApi";

export default function FlowRegister() {
  const [form, setForm] = useState({
    type: "INCOME",
    subType: "BUSINESS",
    category: "",
    paymentMethod: "",
    amount: "",
    company: "",
    memo: "",
    date: "",
  });

  const [transactionType, setTransactionType] = useState("소득");
  const [division, setDivision] = useState("사업");

  const [expenseTypeList, setExpenseTypeList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);

  const [expenseTypeCd, setExpenseTypeCd] = useState("");
  const [paymentCd, setPaymentCd] = useState("");

  useEffect(() => {
    const loadPaymentMethods = async () => {
      const result = await getCodeList("PAYMENT_METHOD");
      setPaymentList(result);
    };

    loadPaymentMethods();
  }, []);

  useEffect(() => {
    const loadExpenseType = async () => {
      let mstCd = "";

      if (form.type === "EXPENSE" && form.subType === "BUSINESS") {
        mstCd = "BIZ_EXPENSE_TYPE";
      }

      if (form.type === "EXPENSE" && form.subType === "PERSONAL") {
        mstCd = "PERSONAL_EXPENSE_TYPE";
      }

      if (form.type === "INCOME" && form.subType === "BUSINESS") {
        mstCd = "BIZ_INCOME_TYPE";
      }

      if (form.type === "INCOME" && form.subType === "PERSONAL") {
        mstCd = "SERVICE_INCOME_TYPE";
      }

      if (form.type === "ASSET") {
        mstCd = "INVEST_TYPE";
      }

      if (!mstCd) {
        setExpenseTypeList([]);
        return;
      }

      const result = await getCodeList(mstCd);
      setExpenseTypeList(result);
      setExpenseTypeCd("");
    };

    loadExpenseType();
  }, [form.type, form.subType]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await saveTransaction(form);
      alert("저장되었습니다.");
    } catch (err) {
      alert("저장 실패");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-10 px-4 pb-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-10">
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">
          자금 흐름 등록
        </h2>

        {/* 거래 유형 */}
        <div className="mb-8">
          <label className="block text-sm text-slate-600 mb-3">거래 유형</label>
          <div className="flex items-center gap-6">
            {[
              { label: "소득", value: "INCOME" },
              { label: "지출", value: "EXPENSE" },
              { label: "저축/투자", value: "ASSET" },
            ].map((item) => (
              <label
                key={item.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="type"
                  value={item.value}
                  checked={form.type === item.value}
                  onChange={handleChange}
                  className="w-4 h-4 accent-slate-900"
                />
                <span className="text-slate-700 text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 사업 / 개인 */}
        <div className="mb-8">
          <label className="block text-sm text-slate-600 mb-3">구분</label>
          <div className="flex items-center gap-6">
            {[
              { label: "사업", value: "BUSINESS" },
              { label: "개인", value: "PERSONAL" },
            ].map((item) => (
              <label
                key={item.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="subType"
                  value={item.value}
                  checked={form.subType === item.value}
                  onChange={handleChange}
                  className="w-4 h-4 accent-slate-900"
                />
                <span className="text-slate-700 text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 지출유형 */}
        <div className="mb-6">
          <select
            value={expenseTypeCd}
            onChange={(e) => setExpenseTypeCd(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3"
          >
            <option value="">유형 선택</option>
            {expenseTypeList.map((item) => (
              <option key={item.SUB_CD} value={item.SUB_CD}>
                {item.SUB_NM}
              </option>
            ))}
          </select>
        </div>

        {/* 결제수단 */}
        <div className="mb-6">
          <select
            value={paymentCd}
            onChange={(e) => setPaymentCd(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3"
          >
            <option value="">결제수단 선택</option>
            {paymentList.map((item) => (
              <option key={item.SUB_CD} value={item.SUB_CD}>
                {item.SUB_NM}
              </option>
            ))}
          </select>
        </div>

        {/* 날짜 + 금액 (2열 유지) */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-slate-600 mb-1">날짜</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">금액</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {/* 거래처 */}
        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-1">거래처</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900"
          />
        </div>

        {/* 메모 */}
        <div className="mb-8">
          <label className="block text-sm text-slate-600 mb-1">메모</label>
          <textarea
            name="memo"
            value={form.memo}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900"
          />
        </div>

        {/* 저장 버튼 */}
        <button onClick={handleSubmit} className="btn-base w-full">
          저장하기
        </button>
      </div>
    </div>
  );
}
