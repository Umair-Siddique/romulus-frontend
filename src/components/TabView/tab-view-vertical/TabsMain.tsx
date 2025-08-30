import { Box } from "@mui/material";

export const TabsMain = ({
  selectedTabContent,
}: {
  selectedTabContent: React.ReactNode | null;
}) => {
  return (
    <Box
      sx={{
        width: "80%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      {selectedTabContent ?? null}
    </Box>
  );
};
