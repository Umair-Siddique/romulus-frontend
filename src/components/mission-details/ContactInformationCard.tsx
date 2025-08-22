import { Email, Message, Phone } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { memo } from "react";
import { useNavigate } from "react-router";

const ContactItem = memo(
  ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
  }) => {
    const theme = useTheme();

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: theme.spacing(2),
        }}
      >
        <Icon sx={{ color: theme.palette.grey[600], fontSize: 20 }} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            minWidth: "60px",
            fontWeight: theme.typography.fontWeightMedium,
          }}
        >
          {label}:
        </Typography>
        <Typography variant="body1" color="text.primary">
          {value}
        </Typography>
      </Box>
    );
  }
);

ContactItem.displayName = "ContactItem";

export const ContactInformationCard = memo(
  ({
    organizationContact,
  }: {
    organizationContact: {
      userId: string;
      name: string;
      avatar: string;
      phone: string;
      email: string;
    };
  }) => {
    const theme = useTheme();

    const navigate = useNavigate();

    const handleSendMessage = () => {
      navigate("/chats", {
        state: {
          recipient: {
            id: organizationContact.userId,
            name: organizationContact.name,
            avatar: organizationContact.avatar,
          },
        },
      });
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mb: theme.spacing(2),
          backgroundColor: theme.palette.background.paper,
          p: theme.spacing(3),
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[1],
        }}
      >
        <Stack spacing={theme.spacing(2)}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: theme.typography.fontWeightMedium,
              mb: theme.spacing(2),
              color: theme.palette.text.primary,
            }}
          >
            Organization Contact
          </Typography>
          <ContactItem
            icon={Phone}
            label="Phone"
            value={organizationContact.phone}
          />
          <ContactItem
            icon={Email}
            label="Email"
            value={organizationContact.email}
          />
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: theme.spacing(2),
          }}
        >
          <Button
            variant="contained"
            startIcon={<Message />}
            onClick={handleSendMessage}
            sx={{
              borderRadius: theme.shape.borderRadius,
              color: theme.palette.common.black,
              backgroundColor: theme.palette.background.default,
              fontWeight: theme.typography.fontWeightMedium,
              textTransform: "none",
              "&:hover": {
                backgroundColor: theme.palette.grey[100],
              },
            }}
          >
            Send Message
          </Button>
        </Box>
      </Box>
    );
  }
);

ContactInformationCard.displayName = "ContactInformationCard";
