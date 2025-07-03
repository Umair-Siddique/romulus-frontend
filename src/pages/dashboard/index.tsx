import { AdminDashboard, MissionsDashboard } from "../../components/dashboard";
import { useUserContext } from "../../context";

export const Dashboard = () => {
  const { user } = useUserContext();

  return (
    <>
      {user.role === "admin" ? (
        <AdminDashboard />
      ) : (
        <MissionsDashboard
          role={user.role}
          title="Manage & Monitor Missions"
          description={`Manage all your missions, ${
            user.role === "organization" && "track educators, "
          }
        and monitor progress in one place.`}
        />
      )}
    </>
  );
};
