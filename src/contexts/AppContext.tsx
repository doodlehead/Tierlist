import { createContext } from "react";
import { SnackbarMessage } from "../utils/common";

type ContextProps = {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  setMessage: (msg: SnackbarMessage) => void;
};

const AppContext = createContext<Partial<ContextProps>>({
  showSidebar: false,
});

export default AppContext;
