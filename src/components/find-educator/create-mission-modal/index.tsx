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
// import { SkillsSection } from "./SkillsSection";
import { DateTimeSection } from "./DateTimeSection";
import { DescriptionField } from "./DescriptionField";
import { FileUploadSection } from "./FileUploadSection";
import { useMany } from "@refinedev/core";

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
  // const [newSkill, setNewSkill] = useState("");
  const [skillsArray, setSkillsArray] = useState<string[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);

  const preferredEducatorsIds = userProfile?.preferredEducators;

  const { data } = useMany({
    resource: "educators",
    ids: preferredEducatorsIds,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
    control,
  } = useForm<FormDataProps>({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      startTime: "",
      endTime: "",
      // skills: "",
      branch: "",
      preferredEducator: "",
      technicalDocument: undefined,
    },
  });

  const organizationId = userProfile?._id;
  const watchedValues = watch();

  const branches = userProfile?.branches
    ?.filter((branch: any) => branch.branchStatus === "active")
    ?.map((branch: any) => ({
      name: branch.branchName,
      coordinates: branch.branchAddressCoordinates.coordinates,
    }));

  const preferredEducators: any[] | undefined = data?.data?.map(
    (educator: any) => ({
      id: educator._id,
      name: `${educator.firstName} ${educator.lastName}`,
    })
  );

  const onFormSubmit = async (data: FormDataProps) => {
    try {
      const formData = new FormData();
      const branchCoordinates = branches.find(
        (branch: any) => branch.name === data.branch
      )?.coordinates;

      // Append all form fields
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.startDate);
      formData.append("startTime", data.startTime);
      formData.append("endTime", data.endTime);
      // formData.append("skills", data.skills);
      formData.append("branch", data.branch);
      formData.append("preferredEducator", data.preferredEducator);
      formData.append("organization", organizationId || "");

      // FIXED: Use selectedDocument state instead of form data
      if (selectedDocument) {
        formData.append("technicalDocument", selectedDocument);
      }

      setDataToSubmit(formData);

      setFindEducatorData({
        coordinates: branchCoordinates,
        skills: skillsArray,
      });
      handleClose();
    } catch (error) {
      console.log("Error creating mission:", error);
    }
  };

  // Updated form validation logic
  const isFormValid =
    isValid &&
    watchedValues.title &&
    watchedValues.description &&
    watchedValues.startDate &&
    watchedValues.startTime &&
    watchedValues.endTime &&
    // skillsArray.length > 0 &&
    watchedValues.branch;

  // Updated handleFileUpload function
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedDocument(files[0]);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
    // setNewSkill("");
    setSkillsArray([]);
  };

  return (
    <StyledDialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          fontSize: theme.typography.h3.fontSize,
          fontWeight: theme.typography.h3.fontWeight,
          fontFamily: theme.typography.h3.fontFamily,
        }}
      >
        Create Mission
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Stack spacing={3}>
            <MissionTitleField register={register} errors={errors} />

            <DescriptionField register={register} errors={errors} />

            <DateTimeSection
              errors={errors}
              watchedValues={watchedValues}
              control={control}
            />

            {/* <SkillsSection
              register={register}
              errors={errors}
              setValue={setValue}
              newSkill={newSkill}
              setNewSkill={setNewSkill}
              skillsArray={skillsArray}
              setSkillsArray={setSkillsArray}
            /> */}

            <BranchSelection
              errors={errors}
              branches={branches}
              control={control}
            />

            <PreferredEducatorSelection
              errors={errors}
              preferredEducators={preferredEducators!}
              control={control}
            />

            <FileUploadSection
              selectedDocument={selectedDocument}
              handleFileUpload={handleFileUpload}
              register={register}
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
