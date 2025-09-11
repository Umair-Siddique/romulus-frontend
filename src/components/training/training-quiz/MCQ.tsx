import React from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface Option {
  id: number;
  option: string;
  points: number;
}

interface MCQProps {
  id: number;
  question: string;
  options: Option[];
  selectedOption: number | null;
  handleSelection: (id: number, optionId: number) => void;
  submitted: boolean;
}

export const MCQ: React.FC<MCQProps> = React.memo(
  ({ id, question, options, selectedOption, handleSelection, submitted }) => {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          {question}
        </Typography>

        <RadioGroup
          value={selectedOption ?? ""}
          onChange={(e) =>
            !submitted && handleSelection(id, Number(e.target.value))
          }
        >
          {options.map((opt) => (
            <FormControlLabel
              key={opt.id}
              value={opt.id}
              control={<Radio />}
              label={opt.option}
            />
          ))}
        </RadioGroup>
      </Box>
    );
  }
);
