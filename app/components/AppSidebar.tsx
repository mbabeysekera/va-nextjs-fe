import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChevronRight from "@/lib/icons/ChevronRight";

export interface SideBarTabs {
  title: string;
  key: string;
}

interface Props {
  username: string;
  tabs: SideBarTabs[];
  selectedTab: string;
  onTabSelect: (tabKey: string) => void;
}

export function AppSidebar({
  username,
  tabs,
  selectedTab,
  onTabSelect,
}: Props) {
  const userNameParts = username.split(" ");
  const userNameInitials = `${userNameParts[0].at(0)}${
    userNameParts[1]?.at(0) ?? ""
  }`;

  return (
    <div className="flex flex-col max-w-2xs min-h-lvh rounded-2xl bg-zinc-400">
      <div className="flex p-3 items-center bg-white rounded-2xl m-1">
        <Avatar className="size-10 font-bold text-xl text-white">
          <AvatarFallback className="bg-pink-900">
            {userNameInitials}
          </AvatarFallback>
        </Avatar>
        <div className="pl-4 text-lg font-semibold">{username}</div>
      </div>
      {tabs.map((item) => (
        <div
          key={item.key}
          className={`p-3 text-xl font-semibold hover:bg-zinc-500 rounded-xl m-1`}
          onClick={() => onTabSelect(item.key)}
        >
          <div className="flex flex-row items-center justify-between">
            {item.title}
            {selectedTab === item.key && <ChevronRight />}
          </div>
        </div>
      ))}
    </div>
  );
}
