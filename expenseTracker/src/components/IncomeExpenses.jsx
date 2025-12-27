import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <div className="flex gap-4 mb-8">
      {/* Income Box */}
      <div className="flex-1 bg-neutral-800 p-6 rounded-xl shadow-lg border border-neutral-700 text-center">
        <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">
          Income
        </h4>
        <p className="text-2xl font-bold text-emerald-400 break-all">
          +${income}
        </p>
      </div>
      {/* Expense Box */}
      <div className="flex-1 bg-neutral-800 p-6 rounded-xl shadow-lg border border-neutral-700 text-center">
        <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">
          Expense
        </h4>
        <p className="text-2xl font-bold text-red-400 break-all">-${expense}</p>
      </div>
    </div>
  );
};
