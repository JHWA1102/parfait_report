import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import BalanceSheetMain from "./balanceSheet/BalanceSheetMain";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<div>메인 페이지</div>} />
          <Route path="balanceSheet" element={<BalanceSheetMain />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
