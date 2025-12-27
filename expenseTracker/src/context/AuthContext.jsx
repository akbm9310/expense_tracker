import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

// Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: true,
};

// Create Context
export const AuthContext = createContext(initialState);

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 1. REGISTER ACTION
  async function register(formData) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/v1/users/register", formData, config);

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data.user,
      });
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        payload: err.response.data.message,
      });
    }
  }

  // 2. LOGIN ACTION
  async function login(formData) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/v1/users/login", formData, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.user,
      });
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        payload: err.response.data.message,
      });
    }
  }

  // 3. LOGOUT ACTION
  async function logout() {
    dispatch({ type: "LOGOUT" });
  }

  // ----------------------------------------------------
  // ✅ THE FIX: useEffect is now INSIDE the component
  // ----------------------------------------------------
  useEffect(() => {
    async function loadUser() {
      try {
        // Ask the backend: "Do I have a valid cookie?"
        const res = await axios.get("/api/v1/users/me");

        // If yes, log the user in automatically
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data.user,
        });
      } catch (err) {
        // If no, ensure loading stops so the Login page can show
        dispatch({ type: "AUTH_ERROR" });
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        loading: state.loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
