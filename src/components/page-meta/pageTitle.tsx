import { useTheme, Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { PageTitleProps } from "#types";

export const PageTitle = ({ title }: PageTitleProps) => {
  const theme = useTheme<Theme>();

  return (
    <Typography
      variant="h4"
      sx={{
        fontWeight: theme.typography.h3.fontWeight,
        mb: theme.spacing(1),
        color: theme.palette.text.primary,
        fontSize: { xs: "1.75rem", md: "2rem" },
        fontFamily: theme.typography.h4.fontFamily,
      }}
    >
      {title}
    </Typography>
  );
};
