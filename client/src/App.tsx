import { Routes, Route } from "react-router-dom";

import "./App.css";
import { BarbersPage } from "./Pages/BarbersPage/BarbersPage";
import { HomePage } from "./Pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/barbers" element={<BarbersPage />} />
      </Routes>
    </>
  );
}

export default App;
