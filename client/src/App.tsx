import { Routes, Route } from "react-router-dom";

import "./App.css";
import { BarbersPage } from "./Pages/BarbersPage/BarbersPage";
import { HomePage } from "./Pages/HomePage/HomePage";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { checkAuth } from "./slices/authThunks/checkAuth";
import { useAppSelector } from "./hooks/useAppSelector";
import { LoginPage } from "./Pages/LoginPage/LoginPage";

import BeatLoader from "react-spinners/BeatLoader";
import { UserProfile } from "./components/UserProfile/UserProfile";

function App() {
  const dispatch = useAppDispatch();
  const { isAuth, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <BeatLoader />
      </div>
    );
  }
  if (!isAuth) {
    return <LoginPage closeModal={() => {}} switchToSignup={() => {}} />;
  }
  
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/barbers" element={<BarbersPage />} />
          {/* <Route path="/user-profile" element={<UserProfile />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
