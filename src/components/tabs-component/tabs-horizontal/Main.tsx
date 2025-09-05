import React from "react";
import { Box } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

export const Main = ({
  selectedTabContent,
}: {
  selectedTabContent: React.ReactNode | null;
}) => {
  const theme = useTheme<Theme>();
  return (
    <Box
      sx={{
        textAlign: "center",
        border: `1px solid ${theme.palette.primary.light}`,
        borderRadius: theme.shape.borderRadius,
        marginTop: 2,
      }}
    >
      {selectedTabContent ?? null}
    </Box>
  );
};
