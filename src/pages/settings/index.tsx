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

  const tabsData = {
    tabsTitles: [
      ...(role !== "admin"
        ? [{ id: "profile", label: "Profile", icon: PersonIcon }]
        : []),
      ...(role !== "admin"
        ? [
            {
              id: "notifications",
              label: "Notifications",
              icon: NotificationIcon,
            },
          ]
        : []),
      { id: "password", label: "Password", icon: LockIcon },
    ].filter((tab) => !!tab),

    tabsContent: [
      ...(role !== "admin" ? [<Profile profileData={userProfile} />] : []),
      ...(role !== "admin" ? [<Notification />] : []),
      <Password />,
    ].filter((content) => !!content),
  };

  return (
    <>
      <PageMeta
        title="Account Settings"
        description="Manage your account settings here"
      />
      <TabViewVertical
        tabsTitles={tabsData.tabsTitles}
        tabsContent={tabsData.tabsContent}
      />
    </>
  );
};
