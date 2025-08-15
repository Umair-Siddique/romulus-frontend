import { Theme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { RemoveRedEye as EyeIcon } from "@mui/icons-material";
import { useNavigate } from "react-router";

import { formatDate, getStatusColor, truncateWithEllipsis } from "#utils";

const TableBodyComponent = ({
  bodyData,
  columnWidths,
  theme,
  navigateTo,
}: {
  bodyData: any;
  columnWidths: any;
  theme: Theme;
  navigateTo?: string;
}) => {
  const navigate = useNavigate();

  const handleView = (
    id: string,
    missionId: string,
    organizationId: string,
    educatorId: string
  ) => {
    if (navigateTo === "reports") {
      navigate(`/${navigateTo}/${id}`, {
        state: {
          missionId,
          organizationId,
          educatorId,
        },
      });
    } else {
      navigate(`/${navigateTo}/${id}`);
    }
  };

  return (
    <TableBody>
      {bodyData?.map((item: any) => (
        <TableRow
          key={item.id}
          hover
          sx={{
            backgroundColor: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          {item.avatar && (
            <TableCell
              align="left"
              sx={{
                padding: theme.spacing(2),
                width: columnWidths.name,
                minWidth: columnWidths.name,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  gap: theme.spacing(2),
                }}
              >
                <Avatar
                  src={item.avatar}
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  {truncateWithEllipsis(
                    item.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                  )}
                </Avatar>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.text.primary,
                  }}
                >
                  {truncateWithEllipsis(
                    item.name ||
                      item.organizationName ||
                      `${item.firstName} ${item.lastName}` ||
                      "N/A"
                  )}
                </Typography>
              </Box>
            </TableCell>
          )}
          {item.reportedBy && (
            <TableCell
              align="center"
              sx={{
                padding: theme.spacing(2),
                width: columnWidths.reportedBy,
                minWidth: columnWidths.reportedBy,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                {truncateWithEllipsis(item.reportedBy)}
              </Typography>
            </TableCell>
          )}
          {item.createdAt && (
            <TableCell
              align="center"
              sx={{
                padding: theme.spacing(2),
                width: columnWidths.registeredOn,
                minWidth: columnWidths.registeredOn,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                {formatDate(item.createdAt)}
              </Typography>
            </TableCell>
          )}
          {item.reportedEducator && (
            <TableCell
              align="center"
              sx={{
                padding: theme.spacing(2),
                width: columnWidths.reportedEducator,
                minWidth: columnWidths.reportedEducator,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                {truncateWithEllipsis(item.reportedEducator)}
              </Typography>
            </TableCell>
          )}
          {item.reportReason && (
            <TableCell
              align="center"
              sx={{
                padding: theme.spacing(2),
                width: columnWidths.reportReason,
                minWidth: columnWidths.reportReason,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                {truncateWithEllipsis(item.reportReason)}
              </Typography>
            </TableCell>
          )}
          {item.siretNumber && (
            <TableCell
              align="center"
              sx={{
                padding: theme.spacing(2),
                width: columnWidths.siretNumber,
                minWidth: columnWidths.siretNumber,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                {item.siretNumber}
              </Typography>
            </TableCell>
          )}
          {item.email && (
            <TableCell
              align="center"
              sx={{
                padding: theme.spacing(2),
                width: columnWidths.email,
                minWidth: columnWidths.email,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                {truncateWithEllipsis(item.email)}
              </Typography>
            </TableCell>
          )}
          {item.phone && (
            <TableCell
              align="center"
              sx={{
                padding: theme.spacing(2),
                width: columnWidths.phone,
                minWidth: columnWidths.email,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                {item.phone}
              </Typography>
            </TableCell>
          )}
          {item.branches && (
            <TableCell
              align="center"
              sx={{
                padding: theme.spacing(2),
                width: columnWidths.branches,
                minWidth: columnWidths.branches,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                {item.branches}
              </Typography>
            </TableCell>
          )}
          {item.status && (
            <TableCell
              align="center"
              sx={{
                padding: theme.spacing(2),
                width: columnWidths.status,
                minWidth: columnWidths.status,
              }}
            >
              <Chip
                label={item.status}
                size="small"
                sx={{
                  ...getStatusColor(item.status),
                  fontWeight: theme.typography.fontWeightMedium,
                }}
              />
            </TableCell>
          )}
          {item.id && (
            <TableCell
              align="center"
              sx={{
                padding: theme.spacing(2),
                width: columnWidths.actions,
                minWidth: columnWidths.actions,
              }}
            >
              <IconButton
                size="small"
                onClick={() =>
                  handleView(
                    item.id,
                    item.missionId,
                    item.organizationId,
                    item.educatorId
                  )
                }
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <EyeIcon />
              </IconButton>
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyComponent;
