import { AdminDashboard, UserDashboard } from "../../components/dashboard";
import { useUserContext } from "../../context";

export const Dashboard = () => {
   const { user } = useUserContext();
  if (!user) {
    return null; // or handle loading state
  }

  const renderDashboardContent = () => {
    switch (user.role) {
      case "admin":
        return <AdminDashboard />;
      case "organization":
      case "educator":
        return (
          <UserDashboard
            role={user.role}
            title="Manage & Monitor Missions"
            description={`Manage all your missions, ${
              user.role === "organization" ? "track educators, " : ""
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
