import { RadioGroup, Typography } from "@mui/material";
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
          gap: 3,
          mb: 4,
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
            color: "#d32f2f",
            ml: 1,
            mt: 0.5,
            display: "block",
            fontSize: "12px",
            fontFamily: "inter, sans-serif",
          }}
        >
          {fieldError?.message}
        </Typography>
      )}
    </>
  );
};
