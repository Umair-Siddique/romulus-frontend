import { Theme } from "@mui/material/styles";
import { TableHead, TableRow, TableCell } from "@mui/material";

const TableHeader = ({
  theme,
  COLUMN_WIDTHS,
}: {
  theme: Theme;
  COLUMN_WIDTHS: any;
}) => (
  <TableHead>
    <TableRow
      sx={{
        backgroundColor: theme.palette.grey[50],
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          borderBottom: `1px solid ${theme.palette.divider}`,
          width: COLUMN_WIDTHS.educator,
          minWidth: COLUMN_WIDTHS.educator,
        }}
      >
        Éducateur
      </TableCell>
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          width: COLUMN_WIDTHS.responseTime,
          minWidth: COLUMN_WIDTHS.responseTime,
        }}
      >
        Temps de réponse
      </TableCell>
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          width: COLUMN_WIDTHS.status,
          minWidth: COLUMN_WIDTHS.status,
        }}
      >
        Statut
      </TableCell>
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          width: COLUMN_WIDTHS.actions,
          minWidth: COLUMN_WIDTHS.actions,
        }}
      >
        Actions
      </TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeader;
