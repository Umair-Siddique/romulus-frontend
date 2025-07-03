import { useUserContext } from "../../context";

export const Dashboard = () => {
  const { user } = useUserContext();

  return (
    <div>
      Welcome to the Dashboard, {user?.role || "User"}!
    </div>
  );
};
