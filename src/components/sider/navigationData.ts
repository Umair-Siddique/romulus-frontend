import {
  SchoolOutlined as TrainingIcon,
  ChatOutlined as ChatsIcon,
  SettingsOutlined as SettingsIcon,
  PersonSearchOutlined as FindEducatorIcon,
  AccountTreeOutlined as BranchesIcon,
  DashboardOutlined as DashboardIcon,
  BusinessOutlined as OrganizationsIcon,
  PeopleOutlined as EducatorsIcon,
  AssessmentOutlined as ReportsIcon,
} from "@mui/icons-material";

import { NavigationItem } from "#types";

const baseItems = {
  dashboard: { text: "Dashboard", to: "/dashboard", icon: DashboardIcon },
  training: { text: "Training", to: "/training", icon: TrainingIcon },
  chats: { text: "Chats", to: "/chats", icon: ChatsIcon },
  settings: { text: "Settings", to: "/settings", icon: SettingsIcon },
  findEducator: {
    text: "Find Educator",
    to: "/find-educator",
    icon: FindEducatorIcon,
  },
  branches: { text: "Branches", to: "/branches", icon: BranchesIcon },
  organizations: {
    text: "Organizations",
    to: "/organizations",
    icon: OrganizationsIcon,
  },
  educators: { text: "Educators", to: "/educators", icon: EducatorsIcon },
  reports: { text: "Reports", to: "/reports", icon: ReportsIcon },
};

const roleMenus: Record<string, (keyof typeof baseItems)[]> = {
  educator: ["dashboard", "training", "chats", "settings"],
  organization: ["dashboard", "findEducator", "branches", "chats", "settings"],
  admin: [
    "dashboard",
    "organizations",
    "educators",
    "reports",
    "chats",
    "settings",
  ],
};

export const getNavigationItems = (role: string | null): NavigationItem[] => {
  const menuKeys = roleMenus[role || ""] || [];
  return menuKeys.map((key, index) => ({
    ...baseItems[key],
    active: index === 0,
  }));
};
