import { MenuItem } from "primeng/api";
import { RoutesEnum } from "../enums";

export const STEPPER_OPTIONS: MenuItem[] = [
  {
    routerLink: RoutesEnum.SCREEN_1,
    disabled: false,
  },
  {
    routerLink: RoutesEnum.SCREEN_2,
    disabled: true,
  },
  {
    routerLink: RoutesEnum.SCREEN_3,
    disabled: true,
  },
];
