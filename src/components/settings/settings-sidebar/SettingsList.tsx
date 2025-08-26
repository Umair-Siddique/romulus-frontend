import { SettingsItem } from "./SettingsItem";

export const SettingsList = ({
  settingsData,
  onSettingsSelection,
  selectedSettings,
}: {
  settingsData: any;
  onSettingsSelection: (id: string) => void;
  selectedSettings: string;
}) => {
  if (!settingsData || settingsData.length === 0) return null;

  return settingsData.map((item: any) => (
    <SettingsItem
      key={item.id}
      item={item}
      onSettingsSelection={onSettingsSelection}
      isSelected={selectedSettings === item.id}
    />
  ));
};
