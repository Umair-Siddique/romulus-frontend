import { Link } from "react-router";
import { useTheme, Theme } from "@mui/material/styles";

import { TextLinkProps } from "#types";

export const TextLink = ({ to, label }: TextLinkProps) => {
  const theme = useTheme<Theme>();

  return (
    <Link
      to={to}
      style={{
        color: theme.palette.primary.main,
        textDecoration: "none",
        fontWeight: theme.typography.h2.fontWeight,
        cursor: "pointer",
        border: "none",
        background: "none",
        padding: 0,
        fontFamily: theme.typography.button.fontFamily,
        fontSize: "0.875rem", // 14px equivalent using rem (14/16 = 0.875), matches theme.typography.button.fontSize
      }}
    >
      {label}
    </Link>
  );
};
