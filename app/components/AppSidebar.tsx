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
    <div className="flex min-h-lvh w-64 flex-col rounded-2xl border border-zinc-200 bg-white p-2">
      <div className="mb-3 flex items-center gap-3 rounded-xl bg-zinc-50 px-3 py-2">
        <Avatar className="size-10">
          <AvatarFallback className="bg-pink-900 text-sm font-semibold text-white">
            {userNameInitials}
          </AvatarFallback>
        </Avatar>

        <div className="truncate text-sm font-semibold text-zinc-900">
          {username}
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        {tabs.map((item) => {
          const isActive = selectedTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onTabSelect(item.key)}
              className={`
            group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium
            transition-colors
            ${
              isActive
                ? "bg-zinc-900 text-white"
                : "text-zinc-700 hover:bg-zinc-100"
            }
          `}
            >
              <span>{item.title}</span>
              <ChevronRight
                className={`
              h-4 w-4 transition-transform
              ${
                isActive
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-1 opacity-0 group-hover:opacity-100"
              }
            `}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
