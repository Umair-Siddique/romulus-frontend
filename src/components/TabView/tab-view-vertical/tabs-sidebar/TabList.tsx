import { TabItem } from "./TabItem";

export const TabList = ({
  tabTitles,
  onTabSelection,
  selectedTab,
}: {
  tabTitles: any[];
  onTabSelection: (id: string) => void;
  selectedTab: string;
}) => {
  if (!tabTitles || tabTitles.length === 0) return null;

  return tabTitles.map((item: any) => (
    <TabItem
      key={item.id}
      item={item}
      onTabSelection={onTabSelection}
      isSelected={selectedTab === item.id}
    />
  ));
};
