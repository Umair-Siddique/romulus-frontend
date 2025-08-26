import { Box } from "@mui/material";
import { useTheme, Theme } from "@mui/material";

import { SettingsList } from "./SettingsList";

export const SettingsSidebar = ({
  settingsData,
  onSettingsSelection,
  selectedSettings,
}: {
  settingsData: any;
  onSettingsSelection: (id: string) => void;
  selectedSettings: string;
}) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      sx={{
        width: "20%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: `1px solid ${theme.palette.divider}`,
        p: 2,
      }}
    >
      <SettingsList
        settingsData={settingsData}
        onSettingsSelection={onSettingsSelection}
        selectedSettings={selectedSettings}
      />
    </Box>
  );
};
