import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("");

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// oxlint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  //is a shortcut don't have to write useContext(ThemeContext) instead useTheme get{theme,setTheme} back
  return useContext(ThemeContext);
}
