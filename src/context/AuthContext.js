// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user session on first render
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user);
      }
      setLoading(false);
    };
    getUser();

    // Listen for changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using context easily
export const useAuth = () => useContext(AuthContext);
