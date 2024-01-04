import { useContext } from "react";
import HomeContext from "./Create_context";

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHomeContext debe usarse dentro de un GlobalContextProvider');
  }
  return context;
};