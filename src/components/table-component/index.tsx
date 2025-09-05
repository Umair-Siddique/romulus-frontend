import { useTheme, Theme } from "@mui/material/styles";
import { TableContainer, Paper, Table } from "@mui/material";

import TableBodyComponent from "./TableBody";
import TableHeaderComponent from "./TableHeader";

export const TableComponent = ({
  tableData,
  columnWidths,
  headerData,
  navigateTo,
  menuOptions,
}: {
  tableData: any;
  columnWidths: any;
  headerData: any;
  navigateTo?: string;
  menuOptions?: string[];
}) => {
  const theme = useTheme<Theme>();

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Table sx={{ width: "100%", tableLayout: "fixed" }}>
        <TableHeaderComponent
          headerData={headerData}
          columnWidths={columnWidths}
        />
        <TableBodyComponent
          bodyData={tableData}
          columnWidths={columnWidths}
          navigateTo={navigateTo}
          menuOptions={menuOptions}
        />
      </Table>
    </TableContainer>
  );
};
