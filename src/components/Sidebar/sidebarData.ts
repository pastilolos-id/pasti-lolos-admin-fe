import type { IconProps } from "@/components/Icon";

export const MENU_GROUP_LABEL = "Menu items";

export type MenuItemType = {
  title: string;
  href: string;
  icon: IconProps["name"];
};

export const menuItems: MenuItemType[] = [
  { title: "Beranda", href: "/dashboard", icon: "home" },
  { title: "Transaksi", href: "/transactions", icon: "card" },
  { title: "Tryout", href: "/tryout", icon: "tryout" },
  { title: "Kelas", href: "/courses", icon: "course" },
  { title: "Soal", href: "/question-bank", icon: "exam-multiple-choice" },
  { title: "Kontributor", href: "/contributors", icon: "people-circle-fill" },
  { title: "Voucher", href: "/vouchers", icon: "discount" },
];
