import { useTheme, Theme } from "@mui/material";
import { Typography } from "@mui/material";

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
        display: "flex",
        alignItems: "center",
        gap: 2,
        cursor: "pointer",
        p: 1,
        my: 1,
      }}
      onClick={() => onSettingsSelection(item.id)}
    >
      <Icon color={isSelected ? "primary" : "inherit"} />
      {item.label}
    </Typography>
  );
};
