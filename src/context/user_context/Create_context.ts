import { createContext } from "react";
import User from "../../model/User";
import EditFormData from "./local_data/Edit";

type UserContextType = {
  error: string;
  success: string;
  loading: boolean;
  createUser: (user: User) => void;
  setError: (error: string) => void;
  setSuccess: (success: string) => void;
  setLoading: (loading: boolean) => void;
  editUser: (form: EditFormData) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;