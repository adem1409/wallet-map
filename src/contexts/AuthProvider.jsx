"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "@/config/axios";

const AuthContext = React.createContext();

function AuthProvider({ children, user: initialUser }) {
  const [user, setUser] = useState(initialUser);

  async function fetchUser() {
    try {
      const res = await axios.get("/api/auth/status");

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function logout() {
    await axios.post("/api/auth/logout");
    setUser(null);
  }

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return <AuthContext.Provider value={{ user, setUser, logout, fetchUser }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}
