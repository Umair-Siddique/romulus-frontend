import {
  AssignmentOutlined as MissionsIcon,
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

interface NavigationItem {
  text: string;
  to: string;
  icon: React.ComponentType;
  active: boolean;
}

export const getNavigationItems = (role: string | null): NavigationItem[] => {
  switch (role) {
    case "educator":
      return [
        { text: "Missions", to: "/missions", icon: MissionsIcon, active: true },
        {
          text: "Training",
          to: "/training",
          icon: TrainingIcon,
          active: false,
        },
        { text: "Chats", to: "/chats", icon: ChatsIcon, active: false },
        {
          text: "Settings",
          to: "/settings",
          icon: SettingsIcon,
          active: false,
        },
      ];

    case "organization":
      return [
        { text: "Missions", to: "/missions", icon: MissionsIcon, active: true },
        {
          text: "Find Educator",
          to: "/find-educator",
          icon: FindEducatorIcon,
          active: false,
        },
        {
          text: "Branches",
          to: "/manage-branches",
          icon: BranchesIcon,
          active: false,
        },
        { text: "Chats", to: "/chats", icon: ChatsIcon, active: false },
        {
          text: "Settings",
          to: "/settings",
          icon: SettingsIcon,
          active: false,
        },
      ];

    case "admin":
      return [
        {
          text: "Dashboard",
          to: "/dashboard",
          icon: DashboardIcon,
          active: true,
        },
        {
          text: "Organizations",
          to: "/organizations",
          icon: OrganizationsIcon,
          active: false,
        },
        {
          text: "Educators",
          to: "/educators",
          icon: EducatorsIcon,
          active: false,
        },
        {
          text: "Missions",
          to: "/missions",
          icon: MissionsIcon,
          active: false,
        },
        { text: "Reports", to: "/reports", icon: ReportsIcon, active: false },
        {
          text: "Settings",
          to: "/settings",
          icon: SettingsIcon,
          active: false,
        },
      ];

    default:
      return [];
  }
};
