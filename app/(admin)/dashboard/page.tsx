"use client";
import { useAppContext } from "@/app/AppContext";
import { AppSidebar, SideBarTabs } from "@/app/components/AppSidebar";
import DashboardCard from "@/app/components/DashboardCard";
import ProductControl from "@/app/components/ProductControl";
import ProductSearchCard from "@/app/components/ProductSearchCard";
import ProfileCard from "@/app/components/ProfileCard";
import SettingsControl from "@/app/components/SettingsControl";
import { useState } from "react";

// const tabs: SideBarTabs[] = [
//   {
//     title: "Dashboard",
//     key: "dashboard",
//   },
//   {
//     title: "Products",
//     key: "products",
//   },
//   {
//     title: "Search",
//     key: "search",
//   },
//   {
//     title: "Profile",
//     key: "profile",
//   },
//   {
//     title: "Settings",
//     key: "settings",
//   },
// ];

// {selectedTab === tabs[0].key && <DashboardCard />}
//       {selectedTab === tabs[1].key && <ProductControl />}
//       {selectedTab === tabs[2].key && <ProductSearchCard />}
//       {selectedTab === tabs[3].key && <ProfileCard />}
//       {selectedTab === tabs[4].key && <SettingsControl />}

const tabs: SideBarTabs[] = [
  {
    title: "Products",
    key: "products",
  },
];

const Dashboard = () => {
  const user = useAppContext();
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);
  return (
    <div className="flex flex-row w-full h-full">
      <AppSidebar
        username={user.currentContext.username}
        tabs={tabs}
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
      />
      {selectedTab === tabs[0].key && <ProductControl />}
    </div>
  );
};

export default Dashboard;
