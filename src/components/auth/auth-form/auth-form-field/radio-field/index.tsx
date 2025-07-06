import { useState } from "react";
import { useTheme, Theme } from "@mui/material/styles";
import { RadioGroup, Typography } from "@mui/material";

import { RadioFieldProps } from "#types";

import { UserTypeCard } from "./UserTypeCard";

export const RadioField = ({
  options,
  setFormStep = () => {},
  setUserRole = () => {},
  errors,
  name,
}: RadioFieldProps) => {
  const theme = useTheme<Theme>();
  const [value, setValue] = useState("");
  const fieldError = errors[name];
  const hasError = !!fieldError;

  const handleUserTypeSelection = (newValue: string) => {
    setValue(newValue);
    setUserRole(newValue);
    setTimeout(() => setFormStep(2), 300);
  };

  return (
    <>
      <RadioGroup
        value={value}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: theme.spacing(3),
          mb: theme.spacing(4),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {options.map((option) => (
          <UserTypeCard
            key={option.value}
            icon={option.icon}
            title={option.title}
            description={option.description}
            value={option.value}
            isSelected={value === option.value}
            onSelect={handleUserTypeSelection}
          />
        ))}
      </RadioGroup>
      {hasError && (
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.error.main, // Using theme error color instead of hardcoded #d32f2f
            ml: theme.spacing(1),
            mt: theme.spacing(0.5),
            display: "block",
            fontSize: "0.75rem", // 12px equivalent using rem (12/16 = 0.75)
            fontFamily: theme.typography.caption.fontFamily,
          }}
        >
          {fieldError?.message}
        </Typography>
      )}
    </>
  );
};
