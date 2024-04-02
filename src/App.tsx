import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Main from "./Pages/Home";

interface ProtectedRouteProps {
  redirectTo?: string;
  isAuthentication: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/login",
  isAuthentication,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthentication) {
      navigate(redirectTo);
    }
  }, [isAuthentication, navigate, redirectTo]);

  return <>{children}</>;
};

function App() {
  const token = useSelector((state: RootState) => state.userToken.token);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("token") && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [location.pathname, navigate]);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {token !== null && (
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthentication={token !== null}>
                <Main />
              </ProtectedRoute>
            }
          />
        )}
      </Routes>
    </>
  );
}

export default App;
