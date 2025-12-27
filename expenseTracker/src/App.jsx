import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard"; // Import the new file

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <Routes>
            {/* If user visits home, load Dashboard (which checks security) */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
