import { Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

export const SettingsItem = ({
  item,
  onSettingsSelection,
  isSelected,
}: {
  item: any;
  onSettingsSelection: (id: string) => void;
  isSelected: boolean;
}) => {
  const theme = useTheme<Theme>();

  const Icon = item.icon;

  return (
    <Typography
      variant="body1"
      sx={{
        p: 1,
        my: 1,
        gap: 2,
        display: "flex",
        cursor: "pointer",
        alignItems: "center",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: isSelected ? theme.palette.grey[100] : "transparent",
      }}
      onClick={() => onSettingsSelection(item.id)}
    >
      <Icon color={isSelected ? "primary" : "inherit"} />
      {item.label}
    </Typography>
  );
};
