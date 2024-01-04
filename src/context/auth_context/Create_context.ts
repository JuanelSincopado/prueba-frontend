import { createContext } from "react";
import AuthState from "./local__data/Auth";
import User from "../../model/User";

type AuthContextType = {
  authState: AuthState;
  error: string;
  success: string;
  loading: boolean;
  token: string;
  user: User;
  login: (user: AuthState) => void;
  setError: (error: string) => void;
  setSuccess: (success: string) => void;
  setLoading: (loading: boolean) => void;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  validateToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;