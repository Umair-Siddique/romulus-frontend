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
  dashboard: { text: "Tableau de bord", to: "/dashboard", icon: DashboardIcon },
  training: { text: "Formation", to: "/training", icon: TrainingIcon },
  chats: { text: "Discussions", to: "/chats", icon: ChatsIcon },
  settings: { text: "Paramètres", to: "/settings", icon: SettingsIcon },
  findEducator: {
    text: "Trouver un éducateur",
    to: "/find-educator",
    icon: FindEducatorIcon,
  },
  branches: { text: "Branches", to: "/branches", icon: BranchesIcon },
  organizations: {
    text: "Organisations",
    to: "/organizations",
    icon: OrganizationsIcon,
  },
  educators: { text: "Éducateurs", to: "/educators", icon: EducatorsIcon },
  reports: { text: "Rapports", to: "/reports", icon: ReportsIcon },
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
