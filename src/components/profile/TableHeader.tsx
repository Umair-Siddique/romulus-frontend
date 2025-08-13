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
          width: COLUMN_WIDTHS.missionTitle,
          minWidth: COLUMN_WIDTHS.missionTitle,
        }}
      >
        Mission Title
      </TableCell>
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          width: COLUMN_WIDTHS.createdOn,
          minWidth: COLUMN_WIDTHS.createdOn,
        }}
      >
        Created On
      </TableCell>
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          width: COLUMN_WIDTHS.organization,
          minWidth: COLUMN_WIDTHS.organization,
        }}
      >
        Organization
      </TableCell>
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          width: COLUMN_WIDTHS.branch,
          minWidth: COLUMN_WIDTHS.branch,
        }}
      >
        Branch
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
        Status
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
