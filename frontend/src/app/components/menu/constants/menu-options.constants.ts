import { PrimeIcons } from "primeng/api";
import { IMenuOption } from "../interfaces";
import { MenuOptionsIdEnum } from "../enums";

export const MENU_OPTIONS: IMenuOption[] = [
  {
    id: MenuOptionsIdEnum.LANGUAGE,
    title: "sidebar.language",
    icon: PrimeIcons.LANGUAGE,
  },
  {
    id: MenuOptionsIdEnum.HISTORY,
    title: "sidebar.history",
    icon: PrimeIcons.HISTORY,
    link: "",
  },
];
