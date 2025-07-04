import { Box } from "@mui/material";
import KpiCard from "./kpiCard";

interface KpiCardData {
  title: string;
  total: number;
  icon: React.ReactNode;
  iconBg: string; // Optional background color for the icon
}

export const KpiCards: React.FC<{ kpiCardsData: KpiCardData[] }> = ({
  kpiCardsData,
}) => {
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
