import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

export const TransactionList = () => {
  const { transactions, getTransactions, deleteTransaction, loading, error } =
    useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-400 mt-4">Loading transactions...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-4">Error: {error}</p>;
  }

  return (
    <>
      <h3 className="border-b border-neutral-700 pb-2 mb-4 text-lg font-semibold mt-6">
        History
      </h3>

      <ul className="space-y-3 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
        {transactions.map((transaction) => (
          <li
            key={transaction._id}
            className={`flex justify-between items-center p-3 rounded-lg border-r-4 bg-neutral-900 shadow-sm transition-all hover:bg-neutral-800 ${
              transaction.amount < 0 ? "border-red-500" : "border-emerald-500"
            }`}
          >
            {/* LEFT SIDE: Image + Text */}
            <div className="flex-1 flex items-center mr-4 overflow-hidden">
              {/* IMAGE (If it exists) */}
              {transaction.image && (
                <img
                  src={transaction.image}
                  alt="receipt"
                  className="w-10 h-10 object-cover rounded-full border-2 border-gray-600 mr-3 shrink-0"
                />
              )}

              {/* TEXT & AMOUNT */}
              <div className="flex flex-col">
                <span className="font-medium truncate text-white">
                  {transaction.text}
                </span>
                <span
                  className={`text-xs font-bold ${
                    transaction.amount < 0 ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}${transaction.amount}
                </span>
              </div>
            </div>

            {/* RIGHT SIDE: Delete Button */}
            <button
              onClick={() => deleteTransaction(transaction._id)}
              className="bg-red-500 text-white w-8 h-8 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center text-sm font-bold shadow-md"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
