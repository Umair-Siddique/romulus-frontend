import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

interface UserTypeCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  value?: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

export const UserTypeCard = ({
  icon,
  title,
  description,
  value,
  isSelected,
  onSelect,
}: UserTypeCardProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        border: isSelected ? "2px solid #A1B7AF" : "2px solid #e0e0e0",
        backgroundColor: isSelected ? "#F7FAFC" : "#ffffff",
        borderRadius: 3,
        transition: "all 0.3s ease",
        height: 250,
        width: 300,
        flex: { xs: "none", sm: 1 },
      }}
      onClick={() => value && onSelect(value)}
    >
      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        {/* icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            mb: 2,
            fontSize: "32px",
          }}
        >
          {React.cloneElement(icon, {
            sx: {
              fontSize: 32,
              color: isSelected && "#A1B7AF",
            },
          })}
        </Box>

        {/* title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: "#000",
            fontSize: "20px",
            fontFamily: "montserrat, -apple-system, sans-serif",
          }}
        >
          {title}
        </Typography>

        {/* description */}
        <Typography
          variant="body2"
          sx={{
            color: "#666",
            fontSize: "14px",
            lineHeight: 1.4,
            fontFamily: "inter, -apple-system, sans-serif",
            maxWidth: "90%",
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

UserTypeCard.displayName = "UserTypeCard";
