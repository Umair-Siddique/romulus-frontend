import {
  PersonOutline as PersonIcon,
  LockOutlined as LockIcon,
  NotificationsNoneOutlined as NotificationIcon,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { useUserContext } from "#context";
import {
  PageMeta,
  TabsVertical,
  Profile,
  Password,
  Notification,
} from "#components";

export const Settings = () => {
  const theme = useTheme<Theme>();
  const { user, userProfile } = useUserContext();

  const { role } = user || {};

  const tabs = [
    {
      id: "profile",
      label: "Profil",
      icon: PersonIcon,
      component: () => (
        <Profile profileData={userProfile} key={userProfile?._id} />
      ),
      show: role !== "admin",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: NotificationIcon,
      component: () => <Notification />,
      show: role !== "admin",
    },
    {
      id: "password",
      label: "Mot de passe",
      icon: LockIcon,
      component: () => <Password />,
      show: true,
    },
  ];

  const visibleTabs = tabs.filter((tab) => tab.show);

  return (
    <>
      <PageMeta
        title="Paramètres du compte"
        description="Gérez les paramètres de votre compte ici"
      />
      <Box
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          mt: 3,
        }}
      >
        <TabsVertical tabs={visibleTabs} />
      </Box>
    </>
  );
};
