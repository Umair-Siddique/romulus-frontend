import { MissionsTabProps } from "#types";
import { MissionCard } from "./MissionCard";
import { ToolBar } from "./ToolBar";

export const MissionsTab = ({ missions }: MissionsTabProps) => {
  return (
    <>
      {/* Toolbar */}
      <ToolBar />

      {/* Mission Cards */}
      {missions?.map((mission, index) => (
        <MissionCard key={index} {...mission} />
      ))}
    </>
  );
};
