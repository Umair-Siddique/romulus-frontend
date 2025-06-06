import React from "react";
import { Box, Typography } from "@mui/material";
import { UserType } from "../../../types/auth";
import { Person, Business } from "@mui/icons-material";
import { UserTypeCard } from "./UserTypeCard";

const userTypes: UserType[] = [
  {
    id: "educator",
    title: "I'm Educator",
    description:
      "I am an educator looking to join as a member of this platform to engage with tasks and missions.",
    icon: <Person />,
  },
  {
    id: "organization",
    title: "I'm Organization",
    description:
      "I am an organization that creates tasks and invites educators to participate in them.",
    icon: <Business />,
  },
];

interface UserTypeSelectionProps {
  onUserTypeSelect: (userType: string) => void;
}

export const UserTypeSelection = React.memo(
  ({ onUserTypeSelect }: UserTypeSelectionProps) => {
    const [selectedUserType, setSelectedUserType] = React.useState<
      string | null
    >(null);

    const handleUserTypeSelect = (userType: string) => {
      setSelectedUserType(userType);
      // Automatically proceed to next step after selection
      setTimeout(() => {
        onUserTypeSelect(userType);
      }, 300); // Small delay to show selection feedback
    };

    return (
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        {/* Welcome Text */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            mb: 1,
            color: "#1a1a1a",
            fontSize: { xs: "28px", md: "32px" },
            fontFamily: "montserrat, sans-serif",
          }}
        >
          Select Your User Type
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            textAlign: "center",
            mb: 4,
            fontSize: "15px",
            lineHeight: 1.5,
            fontFamily: "inter, sans-serif",
          }}
        >
          Choose your role to proceed with the registration or login process.
        </Typography>

        {/* User Type Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 3,
            mb: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {userTypes.map((type) => (
            <UserTypeCard
              key={type.id}
              userType={type}
              isSelected={selectedUserType === type.id}
              onSelect={handleUserTypeSelect}
            />
          ))}
        </Box>
      </Box>
    );
  }
);

UserTypeSelection.displayName = "UserTypeSelection";
