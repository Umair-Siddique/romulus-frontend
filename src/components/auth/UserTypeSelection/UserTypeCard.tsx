import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { UserType } from "../../../interface/auth";

interface UserTypeCardProps {
  userType: UserType;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const UserTypeCard = React.memo(
  ({ userType, isSelected, onSelect }: UserTypeCardProps) => {
    return (
      <Card
        onClick={() => onSelect(userType.id)} // Fixed: Now passing userType.id instead of userType.title
        sx={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          border: isSelected ? "2px solid #A1B7AF" : "2px solid #e0e0e0",
          backgroundColor: isSelected ? "#A1B7AF" : "#ffffff",
          borderRadius: 3,
          transition: "all 0.3s ease",
          minHeight: 250,
          width: 280,
          height: 250,
          "&:hover": {
            borderColor: "#A1B7AF",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
          boxShadow: isSelected
            ? "0 4px 12px rgba(0, 0, 0, 0.1)"
            : "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
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
          {/* Icon */}
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
            {React.cloneElement(userType.icon as React.ReactElement, {
              sx: {
                fontSize: 32,
                color: isSelected && "#fff",
              },
            })}
          </Box>

          {/* Title */}
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
            {userType.title}
          </Typography>

          {/* Description */}
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
            {userType.description}
          </Typography>
        </CardContent>
      </Card>
    );
  }
);

UserTypeCard.displayName = "UserTypeCard";
