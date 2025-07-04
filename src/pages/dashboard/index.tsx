import { AdminDashboard, UserDashboard } from "../../components/dashboard";
import { useUserContext } from "../../context";

export const Dashboard = () => {
  const { user } = useUserContext();

  const { role } = user || {};

  const renderDashboardContent = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard />;
      case "organization":
      case "educator":
        return (
          <UserDashboard
            role={role}
            title="Manage & Monitor Missions"
            description={`Manage all your missions, ${
              role === "organization" ? "track educators, " : ""
            }
        and monitor progress in one place.`}
          />
        );
      default:
        return null;
    }
  };

  return renderDashboardContent();
};
