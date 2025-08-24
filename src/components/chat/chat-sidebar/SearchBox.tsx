import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const SearchBox = ({
  handleSearch,
}: {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const theme = useTheme();

  return (
    <Box
      component="input"
      placeholder="Search"
      onChange={handleSearch}
      sx={{
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: theme.spacing(2),
        mb: theme.spacing(2),
        overflow: "hidden",
        border: "none",
        outline: "none",
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        fontSize: theme.typography.body2.fontSize,
        fontFamily: theme.typography.body2.fontFamily,
        fontWeight: theme.typography.body2.fontWeight,
        color: theme.palette.text.primary,
        placeholderColor: theme.palette.text.secondary,
        resize: "none",
      }}
    />
  );
};
