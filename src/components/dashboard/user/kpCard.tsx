// src/components/kpi-card.tsx
import React from "react";
import { Card, Typography, Box, Avatar } from "@mui/material";

interface KpiCardProps {
  title: string;
  total: number;
  icon: React.ReactNode;
  iconBg: string; // Optional background color for the icon
}

const KpiCard: React.FC<KpiCardProps> = ({ title, total, icon, iconBg }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        p: 3,
        flex: "1 1 auto", // Equal flex distribution
        width: "15%",
        minHeight: 140,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Avatar
          sx={{
            bgcolor: iconBg,
            color: "#4CAF50",
            width: 40,
            height: 40,
            fontSize: 20,
          }}
        >
          {icon}
        </Avatar>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontWeight={500}
          sx={{ fontSize: "1rem" }}
        >
          {title}
        </Typography>
      </Box>
      <Typography
        variant="h4"
        fontWeight={700}
        color="text.primary"
        sx={{ fontSize: "2.25rem", textAlign: "center", flexGrow: 1 }}
      >
        {total}
      </Typography>
    </Card>
  );
};

export default KpiCard;
