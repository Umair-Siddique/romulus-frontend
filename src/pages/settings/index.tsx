import { Box } from "@mui/material";
import { useTheme, Theme } from "@mui/material";
import {
  PersonOutline as PersonIcon,
  LockOutlined as LockIcon,
  NotificationsNoneOutlined as NotificationIcon,
} from "@mui/icons-material";

import { PageMeta, SettingsMain, SettingsSidebar } from "#components";
import { useState } from "react";

export const Settings = () => {
  const theme = useTheme<Theme>();

  const [selectedSettings, setSelectedSettings] = useState<string>("profile");

  const settingsData = [
    { id: "profile", label: "Profile", icon: PersonIcon },
    { id: "password", label: "Password", icon: LockIcon },
    { id: "notifications", label: "Notifications", icon: NotificationIcon },
  ];

  const handleSettingsSelection = (id: string) => {
    setSelectedSettings(id);
  };

  return (
    <>
      <PageMeta
        title="Account Settings"
        description="Manage your account settings here"
      />
      <Box
        sx={{
          display: "flex",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          mt: 3,
        }}
      >
        <SettingsSidebar
          settingsData={settingsData}
          onSettingsSelection={handleSettingsSelection}
          selectedSettings={selectedSettings}
        />
        <SettingsMain selectedSettings={selectedSettings} />
      </Box>
    </>
  );
};
