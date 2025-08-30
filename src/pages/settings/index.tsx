import {
  PersonOutline as PersonIcon,
  LockOutlined as LockIcon,
  NotificationsNoneOutlined as NotificationIcon,
} from "@mui/icons-material";

import { useUserContext } from "#context";
import {
  PageMeta,
  TabViewVertical,
  Profile,
  Password,
  Notification,
} from "#components";

export const Settings = () => {
  const { user, userProfile } = useUserContext();

  const { role } = user || {};

  const settingsTabs = [
    ...(role !== "admin"
      ? [{ id: "profile", label: "Profile", icon: PersonIcon }]
      : []),
    { id: "password", label: "Password", icon: LockIcon },
    { id: "notifications", label: "Notifications", icon: NotificationIcon },
  ];

  const settingsContent = [
    role !== "admin" ? <Profile profileData={userProfile} /> : null,
    <Password />,
    <Notification />,
  ];

  return (
    <>
      <PageMeta
        title="Account Settings"
        description="Manage your account settings here"
      />
      <TabViewVertical tabTitles={settingsTabs} tabsContent={settingsContent} />
    </>
  );
};
