import { RadioGroup, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import React, { useState } from "react";
import { UserTypeCard } from "../userTypeCard";

type RadioFieldOption = {
  icon: React.ReactElement;
  title: string;
  description: string;
  value: string;
};

type RadioFieldProps = {
  options: RadioFieldOption[];
  setFormStep?: (step: number) => void;
  setUserRole?: (role: string) => void;
  errors: Record<string, any>;
  name: string;
};

export const RadioField: React.FC<RadioFieldProps> = ({
  options,
  setFormStep = () => {},
  setUserRole = () => {},
  errors,
  name,
}) => {
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
