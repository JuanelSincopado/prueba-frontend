import { createContext } from "react";

type HomeContextType = {
  openEditModal: boolean;
  setOpenEditModal: (open: boolean) => void;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export default HomeContext;