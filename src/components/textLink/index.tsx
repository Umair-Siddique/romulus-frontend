import React from "react";
import { Link } from "react-router";

type TextLinkProps = {
  to: string;
  label: string;
};

const TextLink: React.FC<TextLinkProps> = ({ to, label }) => {
  return (
    <Link
      to={to}
      style={{
        color: "#A1B7AF",
        textDecoration: "none",
        fontWeight: 600,
        cursor: "pointer",
        border: "none",
        background: "none",
        padding: 0,
        fontFamily: "montserrat, sans-serif",
        fontSize: "14px",
      }}
    >
      {label}
    </Link>
  );
};

export default TextLink;
