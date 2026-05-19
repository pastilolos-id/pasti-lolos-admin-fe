import type { IconProps } from "@/components/Icon";

type SubMenuItemType = {
  title: string;
  href: string;
  icon: IconProps["name"];
};

export type MenuItemType = {
  title: string;
  href: string;
  icon: IconProps["name"];
  subMenu?: SubMenuItemType[];
};

export const menuItems: MenuItemType[] = [
  { title: "Beranda", href: "/dashboard", icon: "home" },
  { title: "Transaksi", href: "/transactions", icon: "card" },
  { title: "Tryout", href: "/tryout", icon: "tryout" },
  { title: "Kelas", href: "/courses", icon: "course" },
  { title: "Soal", href: "/question-bank", icon: "exam-multiple-choice" },
  {
    title: "Manajemen Akun",
    href: "/account-management/admin",
    icon: "people-circle-fill",
    subMenu: [
      {
        title: "Admin",
        href: "/account-management/admin",
        icon: "people-circle-fill",
      },
      {
        title: "Kontributor",
        href: "/account-management/contributors",
        icon: "people-circle-fill",
      },
      {
        title: "Student",
        href: "/account-management/students",
        icon: "people-circle-fill",
      },
    ],
  },
  { title: "Voucher", href: "/vouchers", icon: "discount" },
];
