import { TableHead, TableRow, TableCell, Theme } from "@mui/material";

const TableHeaderComponent = ({
  headerData,
  columnWidths,
  theme,
}: {
  headerData: any;
  columnWidths: any;
  theme: Theme;
}) => {
  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: theme.palette.grey[50],
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        {headerData.map((header: any) => (
          <TableCell
            key={header.id}
            align="center"
            sx={{
              fontWeight: theme.typography.fontWeightBold,
              color: theme.palette.text.primary,
              padding: theme.spacing(2),
              borderBottom: `1px solid ${theme.palette.divider}`,
              width: columnWidths[header.id],
              minWidth: columnWidths[header.id],
            }}
          >
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaderComponent;
