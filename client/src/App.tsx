import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { HomePage } from "./Pages/HomePage/HomePage";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { checkAuth } from "./slices/authThunks/checkAuth";
import { useAppSelector } from "./hooks/useAppSelector";
import BeatLoader from "react-spinners/BeatLoader";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { ProfileLayout } from "./Pages/ProfileLayout/ProfileLayout";
import { ActivationPage } from "./Pages/ActivationPage/ActivationPage";
import { ConfirmPasswordChange } from "./components/ConfirmPasswordChange/ConfirmPasswordChange";

import { AdminPanelPage } from "./Pages/AdminPanelPage/AdminPanelPage";
import { Page403 } from "./Pages/Page403/Page403";
import { Page404 } from "./Pages/Page404/Page404";

function App() {
  const dispatch = useAppDispatch();
  const { isAuth, client, loading } = useAppSelector((state) => state.auth);

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
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/admin-panel"
          element={
            isAuth && client?.role === "admin" ? (
              <AdminPanelPage />
            ) : (
              <Page403 />
            )
          }
        />
        <Route
          path="/confirm-password-change"
          element={<ConfirmPasswordChange />}
        />

        <Route path="/activation" element={<ActivationPage />} />
        {isAuth && client?.isActivated ? (
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<UserProfile />} />
          </Route>
        ) : (
          <Route path="/profile" element={<Navigate to="/activation" />} />
        )}

        <Route path="/*" element={<Page404 />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
