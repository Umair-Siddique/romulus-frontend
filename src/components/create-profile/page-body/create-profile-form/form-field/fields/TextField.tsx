import { useRef, useCallback } from "react";
import { useTheme, Theme } from "@mui/material/styles";
import { Box, Typography, TextField } from "@mui/material";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

import { TextFieldComponentProps } from "#types";

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const TextFieldComponent = ({
  fieldName,
  label,
  type,
  maxLength,
  value,
  onChange,
  required = false,
  placeholder,
}: TextFieldComponentProps) => {
  const theme = useTheme<Theme>();
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
    libraries: ["places"],
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const handlePlacesChanged = useCallback(() => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const address = places[0].formatted_address || "";
      onChange(address);
    }
  }, [onChange]);

  const isMultiline = fieldName === "bio" || fieldName === "fullAddress";
  const rows = fieldName === "bio" ? 4 : fieldName === "fullAddress" ? 2 : 1;

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    switch (fieldName) {
      case "bio":
        return "Tell us about yourself, your experience, and what makes you unique...";
      case "fullAddress":
        return "Enter your complete address";
      default:
        return `Enter your ${label.toLowerCase()}`;
    }
  };

  const commonSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(0.5),
      backgroundColor: theme.palette.background.paper,
      "& fieldset": { borderColor: theme.palette.divider },
      "&:hover fieldset": { borderColor: theme.palette.primary.light },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.light,
        borderWidth: 2,
      },
    },
    "& .MuiInputBase-input": { color: theme.palette.text.primary },
    "& .MuiInputBase-input::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  };

  const isAddressField =
    fieldName === "fullAddress" || fieldName === "officeAddress";

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          mb: theme.spacing(1),
          fontWeight: theme.typography.h3.fontWeight,
          color: theme.palette.text.primary,
        }}
      >
        {label} {required && "*"} {!required && "(Optional)"}
      </Typography>

      {isAddressField ? (
        isLoaded ? (
          <StandaloneSearchBox
            onLoad={(ref) => (searchBoxRef.current = ref)}
            onPlacesChanged={handlePlacesChanged}
          >
            <TextField
              fullWidth
              type={type}
              value={value || ""}
              name={fieldName}
              inputProps={{ maxLength }}
              onChange={handleChange}
              placeholder={getPlaceholder()}
              multiline={isMultiline}
              rows={isMultiline ? rows : undefined}
              sx={commonSx}
            />
          </StandaloneSearchBox>
        ) : (
          <TextField
            disabled
            fullWidth
            placeholder="Loading address field..."
            sx={commonSx}
          />
        )
      ) : (
        <TextField
          fullWidth
          type={type}
          value={value || ""}
          name={fieldName}
          inputProps={{ maxLength }}
          onChange={handleChange}
          placeholder={getPlaceholder()}
          multiline={isMultiline}
          rows={isMultiline ? rows : undefined}
          sx={commonSx}
        />
      )}
    </Box>
  );
};
