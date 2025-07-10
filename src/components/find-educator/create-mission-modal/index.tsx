import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Typography,
  Stack,
  useTheme,
  styled,
  Theme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useForm } from "@refinedev/react-hook-form";

import { useUserContext } from "#context";
import { CreateMissionModalProps, FormDataProps } from "#types";

// Import child components
import { MissionTitleField } from "./MissionTitleField";
import { BranchSelection } from "./BranchSelection";
import { PreferredEducatorSelection } from "./PreferredEducatorSelection";
import { SkillsSection } from "./SkillsSection";
import { DateTimeSection } from "./DateTimeSection";
import { DescriptionField } from "./DescriptionField";
import { FileUploadSection } from "./FileUploadSection";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    maxWidth: "700px",
    width: "100%",
    margin: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
}));

export const CreateMissionModal = ({
  open,
  onClose,
  setFindEducatorData,
  setDataToSubmit,
}: CreateMissionModalProps) => {
  const theme = useTheme<Theme>();
  const { userProfile } = useUserContext();
  const [newSkill, setNewSkill] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const [skillsArray, setSkillsArray] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
    control,
  } = useForm<FormDataProps>({
    mode: "onChange",
    defaultValues: {
      title: "",
      branch: "",
      preferredEducator: "",
      skills: "",
      startDate: "",
      startTime: "",
      endTime: "",
      description: "",
      technicalDocument: undefined,
    },
  });

  const organizationId = userProfile?._id;
  const watchedValues = watch();

  const branches = userProfile?.branches?.map((branch: any) => ({
    name: branch.branchName,
    coordinates: branch.branchAddressCoordinates.coordinates,
  }));

  const preferredEducators: any = ["Select Educator"];

  const onFormSubmit = async (data: FormDataProps) => {
    try {
      const formData = new FormData();
      const branchCoordinates = branches.find(
        (branch: any) => branch.name === data.branch
      )?.coordinates;

      formData.append("title", data.title);
      formData.append("branch", data.branch);
      formData.append("preferredEducator", data.preferredEducator);
      formData.append("skills", data.skills);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.startDate);
      formData.append("startTime", data.startTime);
      formData.append("endTime", data.startTime);
      formData.append("description", data.description);
      formData.append("organization", organizationId || "");

      if (data.technicalDocument && data.technicalDocument.length > 0) {
        formData.append("technicalDocument", data.technicalDocument[0]);
      }

      setDataToSubmit(formData);

      setFindEducatorData({
        coordinates: branchCoordinates,
        skills: skillsArray,
      });
      handleClose();
    } catch (error) {
      console.error("Error creating mission:", error);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
    setSelectedDocument(null);
    setNewSkill("");
    setSkillsArray([]);
  };

  const isFormValid =
    isValid &&
    watchedValues.title &&
    watchedValues.branch &&
    skillsArray.length > 0 &&
    watchedValues.startDate &&
    watchedValues.startTime &&
    watchedValues.endTime &&
    watchedValues.description;

  return (
    <StyledDialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Create Mission
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Stack spacing={3}>
            <MissionTitleField register={register} errors={errors} />

            <BranchSelection
              register={register}
              errors={errors}
              branches={branches}
              control={control}
            />

            <PreferredEducatorSelection
              register={register}
              errors={errors}
              preferredEducators={preferredEducators}
            />

            <SkillsSection
              register={register}
              errors={errors}
              setValue={setValue}
              newSkill={newSkill}
              setNewSkill={setNewSkill}
              skillsArray={skillsArray}
              setSkillsArray={setSkillsArray}
            />

            <DateTimeSection
              register={register}
              errors={errors}
              watchedValues={watchedValues}
              control={control}
            />

            <DescriptionField register={register} errors={errors} />

            <FileUploadSection
              register={register}
              selectedDocument={selectedDocument}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isFormValid}
              sx={{
                textTransform: "none",
                padding: theme.spacing(1, 2),
                fontSize: theme.typography.body2.fontSize,
                width: "30%",
                alignSelf: "center",
                opacity: isFormValid ? 1 : 0.6,
                "&:disabled": {
                  backgroundColor: theme.palette.grey[400],
                  color: theme.palette.grey[600],
                },
              }}
            >
              Find Educator
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </StyledDialog>
  );
};