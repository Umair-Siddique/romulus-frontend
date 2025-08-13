import { useTheme, Theme } from "@mui/material/styles";
import { Box, TableContainer, Paper, Table } from "@mui/material";

import TableHeaderComponent from "./TableHeader";
import TableBodyComponent from "./TableBody";

export const TableComponent = ({
  tableData,
  columnWidths,
  headerData,
  navigateTo,
}: {
  tableData: any;
  columnWidths: any;
  headerData: any;
  navigateTo?: string;
}) => {
  const theme = useTheme<Theme>();

  return (
    <>
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
            <TableHeaderComponent
              headerData={headerData}
              columnWidths={columnWidths}
              theme={theme}
            />
            <TableBodyComponent
              bodyData={tableData}
              columnWidths={columnWidths}
              theme={theme}
              navigateTo={navigateTo}
            />
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
