import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null); // <--- 1. Restore File State

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    // 2. Use FormData to send text + file together
    const formData = new FormData();
    formData.append("text", text);
    formData.append("amount", amount);
    if (file) {
      formData.append("image", file);
    }

    addTransaction(formData);

    // Reset form
    setText("");
    setAmount("");
    setFile(null);
  };

  return (
    <div className="bg-neutral-800 p-6 rounded-xl shadow-lg border border-neutral-700 mt-8">
      <h3 className="border-b border-neutral-700 pb-3 mb-6 text-xl font-bold text-white">
        Add new transaction
      </h3>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Text Input */}
        <div className="form-control">
          <label
            htmlFor="text"
            className="block text-gray-300 text-sm font-bold mb-2"
          >
            Text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
            className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Amount Input */}
        <div className="form-control">
          <label
            htmlFor="amount"
            className="block text-gray-300 text-sm font-bold mb-2"
          >
            Amount <br />
            <span className="text-gray-500 text-xs font-normal">
              (negative - expense, positive + income)
            </span>
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* --- 3. THE RESTORED FILE INPUT (Styled for Dark Mode) --- */}
        <div className="form-control">
          <label
            htmlFor="file"
            className="block text-gray-300 text-sm font-bold mb-2"
          >
            Receipt / Photo
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-400
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-emerald-600 file:text-white
               hover:file:bg-emerald-700
               cursor-pointer bg-neutral-700 rounded-lg border border-neutral-600"
          />
        </div>
        {/* --------------------------------------------------------- */}

        <button className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-emerald-500/20 active:scale-95 mt-4">
          Add Transaction
        </button>
      </form>
    </div>
  );
};
