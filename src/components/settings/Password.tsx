import { useState } from "react";
import { useTheme, Theme } from "@mui/material/styles";
import {
  VisibilityOffOutlined as VisibilityOffIcon,
  VisibilityOutlined as VisibilityIcon,
  InfoOutlined as InfoIcon,
} from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  IconButton,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useCustomMutation } from "@refinedev/core";
import { useUserContext } from "#context";

export const Password = () => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();
  const { userId } = user || {};

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const { mutate: updatePassword } = useCustomMutation();

  const getInputProps = (func: () => void) => (
    <InputAdornment position="end">
      <IconButton
        onClick={func}
        edge="end"
        aria-label="toggle password visibility"
      >
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </InputAdornment>
  );

  const handleUpdatePassword = () => {
    if (!newPassword || !confirmPassword) {
      setError("Please enter both new password and confirm password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8 || confirmPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!/[A-Z]/.test(newPassword) || !/[A-Z]/.test(confirmPassword)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[0-9]/.test(newPassword) || !/[0-9]/.test(confirmPassword)) {
      setError("Password must contain at least one number");
      return;
    }

    if (
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword) ||
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(confirmPassword)
    ) {
      setError("Password must contain at least one special character");
      return;
    }

    updatePassword({
      url: "auth/update-password",
      method: "patch",
      values: {
        userId,
        password: newPassword,
      },
    });
  };

  return (
    <Box>
      <Typography
        sx={{
          mb: theme.spacing(2),
          fontWeight: theme.typography.h3.fontWeight,
          fontSize: theme.typography.h3.fontSize,
          fontFamily: theme.typography.h3.fontFamily,
          color: theme.palette.text.primary,
        }}
      >
        Change Password
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: theme.spacing(2),
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{
                  mb: theme.spacing(1),
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.h3.fontWeight,
                  fontSize: "0.875rem",
                  fontFamily: theme.typography.body2.fontFamily,
                }}
              >
                New Password
              </Typography>

              <TextField
                fullWidth
                placeholder="Enter your new password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{
                  width: theme.spacing(56.25),
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: getInputProps(() =>
                    setShowPassword(!showPassword)
                  ),
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  mb: theme.spacing(1),
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.h3.fontWeight,
                  fontSize: "0.875rem",
                  fontFamily: theme.typography.body2.fontFamily,
                }}
              >
                Confirm Password
              </Typography>

              <TextField
                fullWidth
                placeholder="Enter your password"
                type={showConfirmPassword ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{
                  width: theme.spacing(56.25),
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: getInputProps(() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  ),
                }}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={handleUpdatePassword}
            sx={{
              mt: theme.spacing(2),
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              borderRadius: theme.shape.borderRadius,
            }}
          >
            Update Password
          </Button>
          {error && (
            <Typography
              variant="body2"
              sx={{
                mt: theme.spacing(1),
                color: theme.palette.error.main,
                fontWeight: theme.typography.body2.fontWeight,
                fontSize: "0.875rem",
                fontFamily: theme.typography.body2.fontFamily,
              }}
            >
              {error}
            </Typography>
          )}
        </Box>
        <Card
          sx={{
            width: 275,
            height: 205,
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <CardContent>
            <InfoIcon sx={{ color: theme.palette.primary.main }} />
            <Typography
              variant="body1"
              sx={{ fontWeight: theme.typography.h2.fontWeight }}
            >
              Password Requirements
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: theme.typography.body2.fontWeight }}
            >
              Your new password must be at least 8 characters long and include
              one uppercase letter, one number, and one special character (like
              @, #, $, etc.).
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
