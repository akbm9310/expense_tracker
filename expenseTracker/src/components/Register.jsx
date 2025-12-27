import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, isAuthenticated, error } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    // Dark background
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Dark card */}
      <div className="max-w-md w-full space-y-8 bg-neutral-800 p-10 rounded-xl shadow-2xl border border-neutral-700">
        {/* White Title */}
        <h3 className="text-3xl font-extrabold text-center text-white mb-6">
          Sign Up
        </h3>

        {error && (
          <div
            className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              // Dark input styling
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-neutral-600 placeholder-gray-400 text-white bg-neutral-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm mb-4"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              // Dark input styling
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-neutral-600 placeholder-gray-400 text-white bg-neutral-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              // Dark input styling
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-neutral-600 placeholder-gray-400 text-white bg-neutral-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-neutral-800 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Link to Login */}
        <p className="text-center mt-4 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-500 hover:text-emerald-400 font-bold hover:underline transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
