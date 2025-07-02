import { useUserContext } from "../../../context";

export const Home = () => {
  const { user } = useUserContext();

  console.log("Home -> User:", user);
  return <div>Hey, {user?.role}</div>;
};
