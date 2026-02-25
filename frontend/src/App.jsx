import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import BalanceSheetMain from "./pages/balanceSheet/BalanceSheetMain";
import MonthlyFinanceMain from "./pages/monthlyFinance/MonthlyFinanceMain";
import MainPage from "./pages/MainPage";
import FeedPage from "./pages/feed/FeedPage";
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import FlowRegister from "./pages/FinanceFlow/FlowRegister";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<MainPage />} />
          <Route path="balance-sheet" element={<BalanceSheetMain />} />
          <Route path="monthly-finance" element={<MonthlyFinanceMain />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="flow-register" element={<FlowRegister />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
