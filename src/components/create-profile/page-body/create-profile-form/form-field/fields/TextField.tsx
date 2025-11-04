import { useRef, useCallback } from "react";
import { useTheme, Theme } from "@mui/material/styles";
import { Box, Typography, TextField } from "@mui/material";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

import { TextFieldComponentProps } from "#types";

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries: "places"[] = ["places"];

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
    libraries, // ✅ static reference
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

  const isMultiline = fieldName === "bio";
  const rows = isMultiline ? 4 : 1;

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    switch (fieldName) {
      case "bio":
        return "Parlez-nous de vous, de votre expérience et de ce qui vous rend unique...";
      case "fullAddress":
        return "Entrez votre adresse complète";
      default:
        return `Entrez votre ${label.toLowerCase()}`;
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
            placeholder="Chargement du champ d'adresse..."
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
