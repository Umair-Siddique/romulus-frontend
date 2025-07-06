import { MissionsTabProps } from "#types";
import { MissionCard } from "./MissionCard";

export const MissionsTab = ({ missions }: MissionsTabProps) => {
  return (
    <>
      {missions?.map((mission, index) => (
        <MissionCard key={index} {...mission} />
      ))}
    </>
  );
};