import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  IconButton,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { Close as CloseIcon, Add as AddIcon } from "@mui/icons-material";
import { useList } from "@refinedev/core";
import { useUserContext } from "#context";

interface RehireModalProps {
  theme: Theme;
  rehireModalOpen: boolean;
  handleCloseRehireModal: () => void;
  educatorName: string;
  selectedMission: string;
  setSelectedMission: (mission: string) => void;
  handleSubmitRehire: () => void;
  onCreateNewMission: () => void;
}

const RehireModal: React.FC<RehireModalProps> = ({
  theme,
  rehireModalOpen,
  handleCloseRehireModal,
  educatorName,
  selectedMission,
  setSelectedMission,
  handleSubmitRehire,
  onCreateNewMission,
}) => {
  const { user } = useUserContext();

  const { organizationId } = user;

  const handleMissionChange = (event: SelectChangeEvent) => {
    setSelectedMission(event.target.value);
  };

  const { data: missionsData } = useList({
    resource: `missions/organization/${organizationId}`,
    queryOptions: {
      enabled: rehireModalOpen,
    },
  });

  const missions = missionsData?.data || [];
  const pendingMissions = missions.filter(
    (mission) => mission.status === "pending"
  );

  console.log(pendingMissions);

  return (
    <Dialog
      open={rehireModalOpen}
      onClose={handleCloseRehireModal}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(1),
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: theme.spacing(2, 3),
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: theme.typography.h2.fontWeight,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.h5.fontFamily,
          }}
        >
          Rehire Educator
        </Typography>
        <IconButton
          onClick={handleCloseRehireModal}
          sx={{
            position: "absolute",
            right: theme.spacing(2),
            top: theme.spacing(2),
            color: theme.palette.text.secondary,
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: theme.spacing(3) }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: theme.typography.h3.fontWeight,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.h5.fontFamily,
          }}
        >
          Rehire Educator for New Mission
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: theme.typography.body1.lineHeight,
            maxWidth: theme.spacing(50),
            fontFamily: theme.typography.body1.fontFamily,
          }}
        >
          You are about to rehire {educatorName} for a new mission.
        </Typography>

        <Box sx={{ marginY: theme.spacing(2) }}>
          <Typography
            variant="subtitle2"
            sx={{
              marginBottom: theme.spacing(1),
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            Select Mission
          </Typography>

          <FormControl fullWidth>
            <Select
              value={selectedMission}
              onChange={handleMissionChange}
              displayEmpty
              sx={{
                backgroundColor: theme.palette.background.paper,
                "& .MuiSelect-select": {
                  padding: theme.spacing(1.5),
                },
              }}
            >
              <MenuItem value="" disabled>
                <Typography sx={{ color: theme.palette.text.secondary }}>
                  Select Mission
                </Typography>
              </MenuItem>
              {pendingMissions.map((mission) => (
                <MenuItem key={mission._id} value={mission._id}>
                  {mission.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<AddIcon />}
          onClick={onCreateNewMission}
          sx={{
            padding: theme.spacing(1.5),
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main + "0A",
            "&:hover": {
              backgroundColor: theme.palette.primary.main + "1A",
              borderColor: theme.palette.primary.main,
            },
          }}
        >
          Create New Mission
        </Button>
      </DialogContent>

      <DialogActions
        sx={{
          padding: theme.spacing(2, 3),
          borderTop: `1px solid ${theme.palette.divider}`,
          gap: theme.spacing(2),
        }}
      >
        <Button
          onClick={handleCloseRehireModal}
          variant="outlined"
          sx={{
            flex: 1,
            padding: theme.spacing(1.5),
            color: theme.palette.text.primary,
            borderColor: theme.palette.divider,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
              borderColor: theme.palette.text.secondary,
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmitRehire}
          variant="contained"
          disabled={!selectedMission}
          sx={{
            flex: 1,
            padding: theme.spacing(1.5),
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            "&:disabled": {
              backgroundColor: theme.palette.action.disabledBackground,
              color: theme.palette.action.disabled,
            },
          }}
        >
          Re-Hire Educator
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RehireModal;
