import { useUserContext } from "../../context";

export const Missions = () => {
  const { user } = useUserContext();

  return (
    <div>
      Hi, {user?.role}
    </div>
  );
};
