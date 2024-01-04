import { useContext } from "react";
import UserContext from "./Create_context";

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext debe usarse dentro de un GlobalContextProvider');
  }
  return context;
};