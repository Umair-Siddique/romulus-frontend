import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

import { UserTypeCardProps } from "#types";

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
        border: (theme) =>
          isSelected
            ? `2px solid ${theme.palette.primary.light}`
            : `2px solid ${theme.palette.primary.light}`,
        backgroundColor: (theme) =>
          isSelected
            ? theme.palette.background.default
            : theme.palette.background.default,
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
              color: (theme: { palette: { primary: { light: any } } }) =>
                isSelected && theme.palette.primary.light,
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
