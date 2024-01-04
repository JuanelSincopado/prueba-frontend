import { useContext } from "react";
import AuthContext from "./Create_context";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de un GlobalContextProvider');
  }
  return context;
};