import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Header = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center mb-8 p-4 bg-neutral-800 rounded-xl shadow-lg border border-neutral-700">
      {/* CHANGED: text-gray-800 -> text-white */}
      <h2 className="text-2xl font-extrabold text-white tracking-tight">
        Expense Tracker
      </h2>

      <div className="flex items-center gap-4">
        {/* CHANGED: text-gray-600 -> text-gray-400, text-gray-900 -> text-white */}
        <span className="text-sm text-gray-400 font-medium hidden sm:block">
          Hello,{" "}
          <span className="font-bold text-white">
            {user ? user.name : "User"}
          </span>
        </span>

        <button
          onClick={logout}
          // Added a slightly darker hover effect and shadow
          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
