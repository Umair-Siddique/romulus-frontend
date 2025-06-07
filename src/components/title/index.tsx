import { Link } from "react-router";
import Box from "@mui/material/Box";

type TitleProps = {
  collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  return (
    <Link to="/">
      <Box
        display="flex"
        alignItems="center"
        gap={"12px"}
        sx={{
          color: "text.primary",
        }}
      >
        {collapsed ? (
          <h1>Icon</h1>
        ) : (
          <>
            <h1>Icon</h1>
            <h1>Text</h1>
          </>
        )}
      </Box>
    </Link>
  );
};
