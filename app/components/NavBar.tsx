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
import { IntrospectResponse } from "@/lib/auth/introspect";
import Image from "next/image";
import Link from "next/link";

interface NavBarItemLinks {
  linkName: string;
  linkURL: string;
}

const menuItems: { item: string; links: NavBarItemLinks[] }[] = [
  {
    item: "Jewelry",
    links: [
      { linkName: "Earrings", linkURL: "/jewelry/all-earrings" },
      { linkName: "Rings", linkURL: "/jewelry/all-rings" },
      { linkName: "Necklace", linkURL: "/jewelryall-necklace" },
      { linkName: "Bracelets", linkURL: "/jewelry/all-bracelets" },
      { linkName: "Pendants", linkURL: "/jewelry/all-pendants" },
    ],
  },
  { item: "Pearl Type", links: [{ linkName: "Plastic", linkURL: "/test" }] },
  { item: "Upcoming", links: [{ linkName: "Seasonal", linkURL: "/test" }] },
];

interface Props {
  user: IntrospectResponse | null;
}

const NavBar = ({ user }: Props) => {
  var isAdmin = false;
  if (user && (user.role === "ADMIN" || user.role === "MODERATOR")) {
    isAdmin = true;
  }
  return (
    <div className="flex items-center justify-center mx-auto max-w-7xl px-6 py-1 relative z-50">
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
              <Link href="/about_us"> Contact Us </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {isAdmin && (
            <NavigationMenuItem key="About Us">
              <NavigationMenuLink
                asChild
                className={`${navigationMenuTriggerStyle()} text-lg font-medium"`}
              >
                <Link href="/dashboard">
                  <div className="flex items-center">
                    <Image
                      src="/admin_dashboard.svg"
                      alt=""
                      width={30}
                      height={30}
                      className="opacity-80"
                    />
                    <p className="">Admin Dashboard</p>
                  </div>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavBar;
