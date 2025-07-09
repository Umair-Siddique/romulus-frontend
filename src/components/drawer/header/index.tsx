import { Close as CloseIcon } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

type Props = {
  onCloseClick: () => void;
  title?: string;
};

export const DrawerHeader = ({ title, onCloseClick }: Props) => {
  return (
    <>
      <Box
        display="flex"
        borderRadius="0"
        height="60px"
        alignItems="center"
        px="24px"
        bgcolor="background.paper"
      >
        {title && <Typography variant="h6">{title}</Typography>}
        <IconButton
          onClick={onCloseClick}
          sx={{
            marginLeft: "auto",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
    </>
  );
};
