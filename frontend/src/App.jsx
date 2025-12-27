import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import BalanceSheetMain from "./pages/balanceSheet/BalanceSheetMain";
import MonthlyFinanceMain from "./pages/monthlyFinance/MonthlyFinanceMain";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<MainPage />} />
          <Route path="balance-sheet" element={<BalanceSheetMain />} />
          <Route path="monthly-finance" element={<MonthlyFinanceMain />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
