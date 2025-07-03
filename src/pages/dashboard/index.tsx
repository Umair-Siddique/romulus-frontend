import { AdminDashboard, MissionsDashboard } from "../../components/dashboard";
import { useUserContext } from "../../context";

export const Dashboard = () => {
  const { user } = useUserContext();

  return (
    <>{user.role === "admin" ? <AdminDashboard /> : <MissionsDashboard />}</>
  );
};
