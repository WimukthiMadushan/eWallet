import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  username: string;
  userId: string;
}

interface AuthState {
  username: string | null;
  userId : string | null;
}

interface AuthContextType {
  authState: AuthState;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({ username: null , userId: null });

  const login = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      setAuthState({ username: decoded.username, userId: decoded.userId });
      localStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Invalid token", error);
    }
  };

  const logout = () => {
    setAuthState({ username: null, userId: null });
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      login(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
