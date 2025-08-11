import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { TableContainer, Paper } from "@mui/material";
import TableHeader from "./TableHeader";

const NoEducatorFound = ({
  theme,
  COLUMN_WIDTHS,
}: {
  theme: Theme;
  COLUMN_WIDTHS: any;
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.default,
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
      }}
    >
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ width: "100%", tableLayout: "fixed" }}>
          <TableHeader theme={theme} COLUMN_WIDTHS={COLUMN_WIDTHS} />
          <TableBody>
            <TableRow
              sx={{
                backgroundColor: theme.palette.background.default,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <TableCell
                colSpan={4}
                sx={{
                  textAlign: "center",
                  padding: theme.spacing(3),
                  width: "100%",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  No educators found
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NoEducatorFound;
