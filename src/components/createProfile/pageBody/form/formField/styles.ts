export const inputFocusStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F8FAF9",
    "& fieldset": {
      borderWidth: 0,
    },
    "&:hover fieldset": {
      borderWidth: 0,
    },
    "&.Mui-focused fieldset": {
      borderWidth: "2px",
      borderColor: "#A1B7AF",
    },
    "&.Mui-focused": {
      outline: "none",
    },
  },
};

export const selectFocusStyles = {
  borderRadius: "8px",
  backgroundColor: "#F8FAF9",
  "& .MuiSelect-select": {
    py: 1.5,
  },
  "& fieldset": {
    borderWidth: 0,
  },
  "&:hover fieldset": {
    borderWidth: 0,
  },
  "&.Mui-focused fieldset": {
    borderWidth: "2px",
    borderColor: "#A1B7AF",
  },
  "&.Mui-focused": {
    outline: "none !important",
    boxShadow: "none !important",
  },
  "& .MuiSelect-select.Mui-focused": {
    outline: "none !important",
    boxShadow: "none !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none !important",
  },
  "&:focus-within": {
    outline: "none !important",
    boxShadow: "none !important",
  },
};

export const colors = {
  primary: "#A1B7AF",
  primaryLight: "#E8F0EC",
  primaryDark: "#8A9D95",
  text: "#3B4B44",
  textSecondary: "#7A8B84",
  background: "#F8FAF9",
  backgroundAlt: "#FAFAFA",
  border: "#C1CCC5",
  borderLight: "#D4E0DC",
};
