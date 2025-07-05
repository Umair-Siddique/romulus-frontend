import { MissionCard } from "./MissionCard";

interface MissionsTabProps {
  missions?: any[]; // Define the type of missions if known
}

export const MissionsTab = ({ missions }: MissionsTabProps) => {
  return (
    <>
      {missions?.map((mission, index) => (
        <MissionCard key={index} {...mission} />
      ))}
    </>
  );
};