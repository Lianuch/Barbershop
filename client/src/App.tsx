import { Routes, Route } from "react-router-dom";

import "./App.css";
import { BarbersPage } from "./Pages/BarbersPage/BarbersPage";
import { HomePage } from "./Pages/HomePage/HomePage";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { SignupPage } from "./Pages/SignupPage/SignupPage";

function App() {
  return (
    <>
     
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/barbers" element={<BarbersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
