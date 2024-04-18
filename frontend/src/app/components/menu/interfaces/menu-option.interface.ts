import { PrimeIcons } from "primeng/api";
import { MenuOptionsIdEnum } from "../enums";

export interface IMenuOption {
  id: MenuOptionsIdEnum;
  title: string;
  icon: PrimeIcons;
  link?: string;
}
