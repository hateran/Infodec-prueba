import { Routes } from "@angular/router";
import { RoutesEnum } from "./enums";

export const routes: Routes = [
  {
    path: RoutesEnum.SCREEN_1,
    loadChildren: () => import("./pages/screen-1/screen-1.module").then((m) => m.Screen1Module),
  },
  {
    path: RoutesEnum.SCREEN_2,
    loadChildren: () => import("./pages/screen-2/screen-2.module").then((m) => m.Screen2Module),
  },
  {
    path: RoutesEnum.SCREEN_3,
    loadChildren: () => import("./pages/screen-3/screen-3.module").then((m) => m.Screen3Module),
  },
  {
    path: RoutesEnum.HISTORY,
    loadChildren: () => import("./pages/history/history.module").then((m) => m.HistoryModule),
  },
  {
    path: "**",
    redirectTo: RoutesEnum.SCREEN_1,
  },
];
