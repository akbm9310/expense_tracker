import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div className="bg-neutral-800 p-6 rounded-xl shadow-lg border border-neutral-700 mb-6 text-center">
      <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">
        Your Balance
      </h4>
      <h1 className="text-5xl font-extrabold text-white tracking-tight">
        ${total}
      </h1>
    </div>
  );
};
