import { useUserContext } from "#context";
import { UserDashboard } from "#components";

export const Dashboard = () => {
  const { user } = useUserContext();
  const { role, organizationId } = user;

  const activeDashboardProps = {
    role,
    organizationId,
    title:
      role === "admin"
        ? "Manage & Monitor Missions, Educators & Organizations"
        : "Manage & Monitor Missions",
    description:
      role === "admin"
        ? `Manage all your missions, educators and organizations in one place.`
        : role === "organization"
        ? `Manage all your missions, track educators and monitor progress in one place.`
        : `Manage all your missions, and monitor progress in one place.`,
  };

  return (
    <UserDashboard
      key={role} // forces remount when role changes
      {...activeDashboardProps}
    />
  );
};
