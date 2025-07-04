import { Box } from "@mui/material";
import KpiCard from "./KpiCard";

import { KpiCardData } from "#types";

export const KpiCards = ({ kpiCardsData }: { kpiCardsData: KpiCardData[] }) => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={3}
      mt={2}
      width="100%"
      justifyContent="space-between"
    >
      {kpiCardsData.map((kpi) => (
        <KpiCard
          key={kpi.title}
          title={kpi.title}
          total={kpi.total}
          icon={kpi.icon}
          iconBg={kpi.iconBg}
        />
      ))}
    </Box>
  );
};
