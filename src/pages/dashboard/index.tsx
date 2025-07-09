import { useUserContext } from "#context";
import { AdminDashboard, UserDashboard } from "#components";

export const Dashboard = () => {
  const { user } = useUserContext();
  const { role } = user;

  const DashboardComponent =
    role === "admin"
      ? AdminDashboard
      : role === "organization" || role === "educator"
      ? UserDashboard
      : () => null;

  const dashboardProps =
    role === "admin"
      ? {}
      : {
          role,
          title: "Manage & Monitor Missions",
          description: `Manage all your missions, ${
            role === "organization" ? "track educators, " : ""
          } and monitor progress in one place.`,
        };

  return (
    <DashboardComponent
      key={role} // forces remount when role changes
      {...dashboardProps}
    />
  );
};
