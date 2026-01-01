"use client";
import { AppSidebar, SideBarTabs } from "@/app/components/AppSidebar";
import DashboardCard from "@/app/components/DashboardCard";
import ProductControl from "@/app/components/ProductControl";
import ProductSearchCard from "@/app/components/ProductSearchCard";
import ProfileCard from "@/app/components/ProfileCard";
import SettingsControl from "@/app/components/SettingsControl";
import { useState } from "react";
import { useAdmin } from "../AdminContext";

const tabs: SideBarTabs[] = [
  {
    title: "Dashboard",
    key: "dashboard",
  },
  {
    title: "Profile",
    key: "profile",
  },
  {
    title: "Products",
    key: "products",
  },
  {
    title: "Search",
    key: "search",
  },
  {
    title: "Settings",
    key: "settings",
  },
];

const Dashboard = () => {
  const admin = useAdmin();
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);
  return (
    <div className="flex flex-row w-full h-full">
      <AppSidebar
        username={admin.full_name}
        tabs={tabs}
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
      />
      {selectedTab === tabs[0].key && <DashboardCard />}
      {selectedTab === tabs[1].key && <ProfileCard />}
      {selectedTab === tabs[2].key && <ProductControl />}
      {selectedTab === tabs[3].key && <ProductSearchCard />}
      {selectedTab === tabs[4].key && <SettingsControl />}
    </div>
  );
};

export default Dashboard;
