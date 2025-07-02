import { Box, Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useLogin, useOne } from "@refinedev/core";
import { useTheme, Theme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { validationRules } from "../../../constants/validation";
import { AuthBackground, Form } from "../../../components/auth";
import AuthBg from "../../../assets/images/auth-bg.jpg";
import TextLink from "../../../components/textLink";
import { LoginVariables } from "../../../types/index.types";
import { formFields as getStaticFields } from "../formFields";
import { useUserContext } from "../../../context";

type LoginPhase = "idle" | "logging-in" | "fetching-profile" | "complete";

interface UserData {
  educatorId?: string;
  organizationId?: string;
  role: "educator" | "organization";
}

export const LoginPage = () => {
  const theme = useTheme<Theme>();
  const navigate = useNavigate();
  const { setUser, setRole, setHasProfile } = useUserContext();

  // Phase-based state management
  const [loginPhase, setLoginPhase] = useState<LoginPhase>("idle");
  const [userData, setUserData] = useState<UserData | null>(null);

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Login mutation
  const { mutate: login } = useLogin<LoginVariables>();

  // Profile fetching queries - only enabled when we have the respective IDs
  const {
    data: educatorData,
    isLoading: isFetchingEducator,
    isError: isEducatorError,
    error: educatorError,
  } = useOne({
    resource: "educators",
    id: userData?.educatorId,
    queryOptions: {
      enabled: !!userData?.educatorId && loginPhase === "fetching-profile",
    },
  });

  const {
    data: organizationData,
    isLoading: isFetchingOrganization,
    isError: isOrganizationError,
    error: organizationError,
  } = useOne({
    resource: "organizations",
    id: userData?.organizationId,
    queryOptions: {
      enabled: !!userData?.organizationId && loginPhase === "fetching-profile",
    },
  });

  // Handle profile data when it arrives
  useEffect(() => {
    if (loginPhase !== "fetching-profile" || !userData) return;

    const handleEducatorProfile = () => {
      if (isFetchingEducator) return; // Still loading

      if (isEducatorError) {
        console.error("Error fetching educator profile:", educatorError);
        setLoginPhase("complete");
        navigate("/create-profile");
        return;
      }

      if (educatorData?.data) {
        // Profile exists - complete setup and navigate to main app
        const profileData = educatorData.data;
        localStorage.setItem("romulus-user", JSON.stringify(profileData));

        setUser(profileData);
        setRole(userData.role);
        setHasProfile(true);
        setLoginPhase("complete");
        navigate("/");
      } else {
        // No profile found - redirect to create profile
        setLoginPhase("complete");
        navigate("/create-profile");
      }
    };

    const handleOrganizationProfile = () => {
      if (isFetchingOrganization) return; // Still loading

      if (isOrganizationError) {
        console.error(
          "Error fetching organization profile:",
          organizationError
        );
        setLoginPhase("complete");
        navigate("/create-profile");
        return;
      }

      if (organizationData?.data) {
        // Profile exists - complete setup and navigate to main app
        const profileData = organizationData.data;
        localStorage.setItem("romulus-user", JSON.stringify(profileData));

        setUser(profileData);
        setRole(userData.role);
        setHasProfile(true);
        setLoginPhase("complete");
        navigate("/");
      } else {
        // No profile found - redirect to create profile
        setLoginPhase("complete");
        navigate("/create-profile");
      }
    };

    if (userData.role === "educator" && userData.educatorId) {
      handleEducatorProfile();
    } else if (userData.role === "organization" && userData.organizationId) {
      handleOrganizationProfile();
    }
  }, [
    loginPhase,
    userData,
    educatorData,
    organizationData,
    isFetchingEducator,
    isFetchingOrganization,
    isEducatorError,
    isOrganizationError,
    educatorError,
    organizationError,
    setUser,
    setRole,
    setHasProfile,
    navigate,
  ]);

  const onSubmit = (data: LoginVariables) => {
    setLoginPhase("logging-in");

    login(data, {
      onSuccess: (response: any) => {
        const { data: loginUserData } = response;

        // Store basic user data for profile fetching
        const userInfo: UserData = {
          educatorId: loginUserData.educatorId,
          organizationId: loginUserData.organizationId,
          role: loginUserData.role,
        };

        // Check if user has the required profile ID for their role
        const hasRequiredId =
          (userInfo.role === "educator" && userInfo.educatorId) ||
          (userInfo.role === "organization" && userInfo.organizationId);

        if (!hasRequiredId) {
          // User doesn't have a profile - skip API call and go to create profile
          setUser(loginUserData);
          setRole(userInfo.role);
          setHasProfile(false);
          setLoginPhase("complete");
          navigate("/create-profile");
          return;
        }

        // User has profile ID - proceed to fetch profile data
        setUserData(userInfo);
        setLoginPhase("fetching-profile");
      },
      onError: (error) => {
        console.error("Login failed:", error);
        setLoginPhase("idle");
      },
    });
  };

  const formFields = getStaticFields("login").map((field) => ({
    ...field,
    validationRules: field.name === "email" ? validationRules.email : undefined,
    register: form.register,
    errors: form.formState.errors,
  }));

  // Determine loading state and loading text
  const isLoading =
    loginPhase === "logging-in" || loginPhase === "fetching-profile";
  const getLoadingText = () => {
    switch (loginPhase) {
      case "logging-in":
        return "Logging in...";
      case "fetching-profile":
        return "Loading profile...";
      default:
        return "Log In";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Form
        formTitle="Welcome Back!"
        formDescription="Please log in to continue."
        formFields={formFields}
        formType="login"
        isLoading={isLoading}
        bottomTextWithLink={
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{
              mb: theme.spacing(2),
            }}
          >
            Don't have an account? <TextLink to="/register" label="Sign Up" />
          </Typography>
        }
        submitLoadingText={getLoadingText()}
        submitLabel="Log In"
        handleSubmit={form.handleSubmit}
        onSubmit={onSubmit}
        isFormValid={form.formState.isValid}
        hasErrors={Object.keys(form.formState.errors).length > 0}
      />
      <AuthBackground backgroundImage={AuthBg} />
    </Box>
  );
};
