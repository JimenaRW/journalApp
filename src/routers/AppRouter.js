import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { login } from "../actions/auth";
import { AuthRoutes } from "./AuthRoutes";
import { loadNotes } from "../actions/notes";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import LoginScreen from "../components/auth/LoginScreen";
import { JournalScreen } from "../components/journal/JournalScreen";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        dispatch(loadNotes());
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch]);

  if (checking) {
    return (
      <div className="auth__main">
        <div className="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/journalApp/"
            element={
              isLoggedIn ? (
                <JournalScreen />
              ) : (
                <div className="auth__main">
                  <div className="auth__box-container">
                    <LoginScreen />
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/journalApp/auth/*"
            element={!isLoggedIn ? <AuthRoutes /> : <JournalScreen />}
          />
          <Route
            path="/"
            element={<Navigate to="/journalApp/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
