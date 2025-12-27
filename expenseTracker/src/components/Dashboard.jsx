import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Import all the dashboard parts
import { Header } from "./Header";
import { Balance } from "./Balance";
import { IncomeExpenses } from "./IncomeExpenses";
import { TransactionList } from "./TransactionList";
import { AddTransaction } from "./AddTransaction";

export const Dashboard = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // SECURITY GUARD 🛡️
    // If we are done loading, and you are NOT authenticated -> Go to Login
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  // If waiting for the check, show nothing (or a spinner)
  if (loading) return <h1>Loading...</h1>;

  // If you pass the check, show the Dashboard
  return (
    <>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </>
  );
};
