import { TabItem } from "./TabItem";

export const TabList = ({
  tabTitles,
  selectedTabId,
  onTabChange,
}: {
  tabTitles: any[];
  selectedTabId: string;
  onTabChange: (id: string) => void;
}) => {
  if (!tabTitles || tabTitles.length === 0) return null;

  return tabTitles.map((item: any) => (
    <TabItem
      key={item.id}
      item={item}
      onTabChange={onTabChange}
      isSelected={selectedTabId === item.id}
    />
  ));
};
