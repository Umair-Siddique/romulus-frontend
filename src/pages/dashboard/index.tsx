import { useUserContext } from "#context";
import { AdminDashboard, UserDashboard } from "#components";

export const Dashboard = () => {
  const { user } = useUserContext();
  const { role, organizationId } = user;

  const ActiveDashboard = role === "admin" ? AdminDashboard : UserDashboard;

  const activeDashboardProps =
    role === "admin"
      ? {}
      : {
          role,
          organizationId,
          title: "Manage & Monitor Missions",
          description: `Manage all your missions, ${
            role === "organization" ? "track educators, " : ""
          } and monitor progress in one place.`,
        };

  return (
    <ActiveDashboard
      key={role} // forces remount when role changes
      {...activeDashboardProps}
    />
  );
};
