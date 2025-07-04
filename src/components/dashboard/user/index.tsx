import { TabsView } from "./tabView";
import { KpiCards } from "./kpiCards";
import { PageMeta } from "../../page-meta";
import { kpiCardsData } from "./kpiCardsData";

import { UserDashboardProps } from "#types";

export const UserDashboard = ({ title, description }: UserDashboardProps) => {
  return (
    <>
      <PageMeta title={title} description={description} />

      <KpiCards kpiCardsData={kpiCardsData} />

      <TabsView />
    </>
  );
};
