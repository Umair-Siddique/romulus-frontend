import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import {
  RemoveRedEye as EyeIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useUpdate } from "@refinedev/core";
import { Theme, useTheme } from "@mui/material/styles";

import { useUserContext } from "#context";
import { BranchModal } from "./BranchModal";
import { formatDate, getStatusColor, truncateWithEllipsis } from "#lib";

const TableBodyComponent = ({
  bodyData,
  columnWidths,
  navigateTo,
  menuOptions,
}: {
  bodyData: any;
  columnWidths: any;
  navigateTo?: string;
  menuOptions?: string[];
}) => {
  const theme = useTheme<Theme>();

  const navigate = useNavigate();

  const { user } = useUserContext();

  const { organizationId } = user;

  const [menuId, setMenuId] = useState<string>("");
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const { mutate: updateOrganization } = useUpdate({
    resource: "organizations",
    mutationOptions: {
      onSuccess: () => {
        setShowBranchMenu(false);
      },
    },
  });

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

  const handleMenuSelection = (event: any, id: string) => {
    setMenuAnchor(event.currentTarget);
    setMenuId(id);
  };

  const handleMenuItem = (option: string) => {
    if (option === "Inactive Branch") {
      updateOrganization({
        id: organizationId,
        values: {
          branchId: menuId,
          status: "inactive",
        },
      });
    } else if (option === "Activate Branch") {
      updateOrganization({
        id: organizationId,
        values: {
          branchId: menuId,
          status: "active",
        },
      });
    } else if (option === "Edit Branch") {
      setShowBranchMenu(true);

      const branch = bodyData.find((item: any) => item.id === menuId);
      setSelectedBranch(branch);
    }
  };

  const handleBranchUpdate = (branchData: any) => {
    const formData = new FormData();

    Object.keys(branchData).forEach((key) => {
      formData.append(key, branchData[key]);
    });

    updateOrganization({
      id: organizationId,
      values: {
        branchId: menuId,
        ...Object.fromEntries(formData.entries()),
      },
      meta: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });
  };

  return (
    <>
      {" "}
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
            {/* Name */}
            {item.name && (
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
                  {item.avatar && (
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
                  )}
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

            {/* Reported By */}
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

            {/* Mission Title */}
            {item.missionTitle && (
              <TableCell
                align="center"
                sx={{
                  padding: theme.spacing(2),
                  width: columnWidths.missionTitle,
                  minWidth: columnWidths.missionTitle,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {item.missionTitle}
                </Typography>
              </TableCell>
            )}

            {/* Branch Name */}
            {item.branchName && (
              <TableCell
                align="center"
                sx={{
                  padding: theme.spacing(2),
                  width: columnWidths.branchName,
                  minWidth: columnWidths.branchName,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {item.branchName}
                </Typography>
              </TableCell>
            )}

            {/* Created At */}
            {item.createdAt && (
              <TableCell
                align="center"
                sx={{
                  padding: theme.spacing(2),
                  width: columnWidths.createdAt,
                  minWidth: columnWidths.createdAt,
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

            {/* Organization Name */}
            {item.organizationName && (
              <TableCell
                align="center"
                sx={{
                  padding: theme.spacing(2),
                  width: columnWidths.organizationName,
                  minWidth: columnWidths.organizationName,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {item.organizationName}
                </Typography>
              </TableCell>
            )}

            {/* Reported Educator */}
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

            {/* Report Reason */}
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

            {/* Siret Number */}
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

            {/* Email */}
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

            {/* Phone */}
            {item.phone && (
              <TableCell
                align="center"
                sx={{
                  padding: theme.spacing(2),
                  width: columnWidths.phone,
                  minWidth: columnWidths.phone,
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

            {/* Branches */}
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

            {/* Status */}
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

            {/* Actions */}
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
                  sx={{
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {navigateTo ? (
                    <EyeIcon
                      onClick={() =>
                        handleView(
                          item.id,
                          item.missionId,
                          item.organizationId,
                          item.educatorId
                        )
                      }
                    />
                  ) : (
                    <MoreVertIcon
                      onClick={(event) => handleMenuSelection(event, item.id)}
                    />
                  )}
                </IconButton>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
      {/* Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        {menuOptions?.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              setMenuAnchor(null);
              handleMenuItem(option);
            }}
            sx={{
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      {showBranchMenu && (
        <BranchModal
          open={showBranchMenu}
          onClose={() => setShowBranchMenu(false)}
          onSave={handleBranchUpdate}
          existingData={selectedBranch}
          editBranch={selectedBranch}
          editIndex={selectedBranch?.id}
        />
      )}
    </>
  );
};

export default TableBodyComponent;
