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

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: PersonIcon,
      component: <Profile profileData={userProfile} key={userProfile?._id} />,
      show: role !== "admin",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: NotificationIcon,
      component: <Notification />,
      show: role !== "admin",
    },
    {
      id: "password",
      label: "Password",
      icon: LockIcon,
      component: <Password />,
      show: true,
    },
  ];

  const visibleTabs = tabs.filter((tab) => tab.show);

  return (
    <>
      <PageMeta
        title="Account Settings"
        description="Manage your account settings here"
      />
      <TabViewVertical tabs={visibleTabs} />
    </>
  );
};
