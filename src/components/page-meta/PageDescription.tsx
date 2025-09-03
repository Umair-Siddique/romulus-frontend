import Markdown from "react-markdown";
import { Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { PageDescriptionProps } from "#types";

export const PageDescription = ({ description }: PageDescriptionProps) => {
  const theme = useTheme<Theme>();

  return (
    <Typography
      variant="body1"
      sx={{
        color: theme.palette.text.secondary,
        mb: theme.spacing(1),
        fontSize: "0.9375rem",
        lineHeight: theme.typography.body1.lineHeight,
        fontFamily: theme.typography.body1.fontFamily,
      }}
    >
      <Markdown>{description}</Markdown>
    </Typography>
  );
};
