import { useUpdate } from "@refinedev/core";
import React, { useEffect, useState } from "react";
import { useTheme, Theme } from "@mui/material/styles";
import { Box, Typography, Switch } from "@mui/material";

import { useUserContext } from "#context";

export const Notification = React.memo(() => {
  const theme = useTheme<Theme>();

  const { user, setUser } = useUserContext();

  const { userId, role, isMessagesAllowed, isNotificationsAllowed } =
    user || {};

  const { mutate: updateUser } = useUpdate({
    resource: "users",
    mutationOptions: {
      onSuccess: () => {
        const storedUser = JSON.parse(
          localStorage.getItem("romulus-user") || "{}"
        );
        storedUser.isNotificationsAllowed = notificationsAllowed;
        storedUser.isMessagesAllowed = messagesAllowed;

        localStorage.setItem("romulus-user", JSON.stringify(storedUser));

        setUser(storedUser);
      },
    },
  });

  const [notificationsAllowed, setNotificationsAllowed] = useState<boolean>(
    isNotificationsAllowed
  );

  const [messagesAllowed, setMessagesAllowed] =
    useState<boolean>(isMessagesAllowed);

  useEffect(() => {
    setNotificationsAllowed(isNotificationsAllowed);
    setMessagesAllowed(isMessagesAllowed);
  }, [isNotificationsAllowed, isMessagesAllowed]);

  const handleNotificationsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = e.target;

    setNotificationsAllowed(checked);

    updateUser({
      id: userId,
      values: {
        isNotificationsAllowed: checked,
      },
    });
  };

  const handleMessagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setMessagesAllowed(checked);

    updateUser({
      id: userId,
      values: {
        isMessagesAllowed: checked,
      },
    });
  };

  return (
    <Box>
      <Typography
        sx={{
          mb: theme.spacing(2),
          fontWeight: theme.typography.h3.fontWeight,
          fontSize: theme.typography.h3.fontSize,
          fontFamily: theme.typography.h3.fontFamily,
          color: theme.palette.text.primary,
        }}
      >
        Configure Notifications
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(2) }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
            p: theme.spacing(2),
          }}
        >
          <Box>
            <Typography>Account Alerts</Typography>
            <Typography>
              Receive notifications for mission-related events
            </Typography>
          </Box>
          <Switch
            checked={notificationsAllowed}
            onChange={handleNotificationsChange}
          />
        </Box>

        {role !== "admin" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius,
              p: theme.spacing(2),
            }}
          >
            <Box>
              <Typography>Messages</Typography>
              <Typography>
                Receive messages from{" "}
                {role === "educator" ? "organizations" : "educators"}
              </Typography>
            </Box>
            <Switch checked={messagesAllowed} onChange={handleMessagesChange} />
          </Box>
        )}
      </Box>
    </Box>
  );
});
