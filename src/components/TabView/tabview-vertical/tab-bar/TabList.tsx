import { TabItem } from "./TabItem";

export const TabList = ({
  tabsTitles,
  selectedTab,
  onTabChange,
}: {
  tabsTitles: any[];
  selectedTab: string;
  onTabChange: (id: string) => void;
}) => {
  if (!tabsTitles || tabsTitles.length === 0) return null;

  return tabsTitles.map((item: any) => (
    <TabItem
      key={item.id}
      item={item}
      onTabChange={onTabChange}
      isSelected={selectedTab === item.id}
    />
  ));
};
