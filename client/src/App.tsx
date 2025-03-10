import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import { BarbersPage } from "./Pages/BarbersPage/BarbersPage";
import { HomePage } from "./Pages/HomePage/HomePage";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { checkAuth } from "./slices/authThunks/checkAuth";
import { useAppSelector } from "./hooks/useAppSelector";
import BeatLoader from "react-spinners/BeatLoader";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { ProfileLayout } from "./Pages/ProfileLayout/ProfileLayout";
import { ActivationPage } from "./Pages/ActivationPage/ActivationPage";
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
      <div className="flex items-center justify-center h-screen">
        <BeatLoader color="#60BDE6" />
      </div>
    );
  }
  
  return (
    <div >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/barbers" element={<BarbersPage />} />
          <Route path="/activation" element={<ActivationPage />} />
      {isAuth ? (
        <Route path="/profile" element={ <ProfileLayout /> } >
          <Route index element={<UserProfile />} />
       </Route>
      ) : (
        <Route path="profile" element={<Navigate to="/profile" />} />
      )
      }
        </Routes>
    </div>
  );
}

export default App;
