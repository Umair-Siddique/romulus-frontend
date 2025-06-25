import React from "react";
import { Link } from "react-router";
import { useTheme, Theme } from "@mui/material/styles";

type TextLinkProps = {
  to: string;
  label: string;
};

const TextLink: React.FC<TextLinkProps> = ({ to, label }) => {
  const theme = useTheme<Theme>();

  return (
    <Link
      to={to}
      style={{
        color: theme.palette.primary.main,
        textDecoration: "none",
        fontWeight: 600,
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

export default TextLink;
