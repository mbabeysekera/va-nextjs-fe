"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

interface NavBarItemLinks {
  linkName: string;
  linkURL: string;
}

const menuItems: { item: string; links: NavBarItemLinks[] }[] = [
  {
    item: "Jewelry",
    links: [
      { linkName: "Earrings", linkURL: "/products/pages/1?category=EARRING" },
      { linkName: "Rings", linkURL: "/products/pages/1?category=RING" },
      { linkName: "Necklace", linkURL: "/products/pages/1?category=NECKLACE" },
      { linkName: "Bracelets", linkURL: "/products/pages/1?category=BRACELET" },
      { linkName: "Pendants", linkURL: "/products/pages/1?category=PENDANT" },
      { linkName: "Sets", linkURL: "/products/pages/1?category=SETS" },
      { linkName: "Other", linkURL: "/products/pages/1?category=OTHER" },
    ],
  },
  {
    item: "Pearl Type",
    links: [{ linkName: "Coming Soon...", linkURL: "/upcoming" }],
  },
  { item: "Upcoming", links: [{ linkName: "Seasonal", linkURL: "/upcoming" }] },
];

const NavBar = () => {
  return (
    <div className="flex items-center justify-center mx-auto max-w-7xl px-6 py-1 mb-8 relative z-50">
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="flex-wrap">
          {menuItems.map((menuItem) => (
            <NavigationMenuItem key={menuItem.item}>
              <NavigationMenuTrigger className="text-lg font-medium">
                {menuItem.item}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-56 gap-2">
                  {menuItem.links.map((linkDetails) => (
                    <li key={linkDetails.linkName}>
                      <NavigationMenuLink asChild>
                        <Link href={linkDetails.linkURL} className="text-lg">
                          {linkDetails.linkName}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem key="Contact Us">
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} text-lg font-medium"`}
            >
              <Link href="/about"> Contact Us </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavBar;
