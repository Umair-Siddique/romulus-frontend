import { Box } from "@mui/material";

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
  return (
    <Box
      sx={{
        width: "20%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
