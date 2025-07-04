import React from "react";
import { TabsView } from "./tabView";
import { KpiCards } from "./kpiCards";
import { PageMeta } from "../../pageMeta";
import { kpiCardsData } from "./kpiCardsData";

interface UserDashboardProps {
  role: string;
  title: string;
  description: string;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  title,
  description,
}) => {
  return (
    <>
      <PageMeta title={title} description={description} />

      <KpiCards kpiCardsData={kpiCardsData} />

      <TabsView />
    </>
  );
};
