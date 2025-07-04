import { NavItem } from "@/types";
import { Dice1, DockIcon, LayoutDashboard, Table2 } from "lucide-react";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const REGION_URL = process.env.NEXT_PUBLIC_API_REGION;

type navDateType = {
  navItems: NavItem[];
};

export const getNavData = (): navDateType => {
  return {
    navItems: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        roles: ["admin", "superadmin", "user"],
      },
      {
        title: "Form Input",
        url: "/form-input",
        icon: DockIcon,
        roles: ["superadmin", "admin", "user"],
        directLinkRoles: ["user"],
        items: [
          {
            title: "Semua Input",
            url: "/form-input/all",
            roles: ["superadmin", "admin"],
          },
          {
            title: "Surat",
            url: "/form-input/letter",
            roles: ["superadmin", "admin"],
          },
        ],
      },
      {
        title: "Tables",
        url: "/tables",
        icon: Table2,
        roles: ["superadmin", "admin", "user"],
        directLinkRoles: ["user"],
        items: [
          {
            title: "tables admin",
            url: "/tables/admin",
            roles: ["superadmin", "admin"],
          },
        ],
      },
      // Uncomment if you want to add a dashboard link
      {
        title: "Manajemen Meja",
        url: "/manajemen-meja",
        icon: Dice1,
        roles: ["admin", "superadmin", "user"],
      },
    ],
  };
};
