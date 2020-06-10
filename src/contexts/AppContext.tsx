import React from "react";

type ContextProps = {
  showSidebar: boolean;
  setShowSidebar: Function;
};

const AppContext = React.createContext<Partial<ContextProps>>({
  showSidebar: false,
});

export default AppContext;
