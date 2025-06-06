import React, {
  createContext,
  type PropsWithChildren,
  useContext,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import { LightThemeWithResponsiveFontSizes as LightTheme } from "../theme";

type ColorModeContextType = {
  mode: "light";
  setMode: () => void;
};

// Dummy context (still provided in case existing components rely on it)
export const ColorModeContext = createContext<ColorModeContextType>({
  mode: "light",
  setMode: () => {
    console.warn("Theme is fixed to light. Switching mode is disabled.");
  },
});

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ColorModeContext.Provider
      value={{
        mode: "light",
        setMode: () => {
          console.warn("Theme is fixed to light. Switching mode is disabled.");
        },
      }}
    >
      <ThemeProvider theme={LightTheme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorModeContext = () => {
  const context = useContext(ColorModeContext);

  if (context === undefined) {
    throw new Error("useColorModeContext must be used within a ConfigProvider");
  }

  return context;
};
