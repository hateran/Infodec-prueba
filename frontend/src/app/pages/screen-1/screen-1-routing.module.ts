import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { Screen1Component } from "./screen-1.component";

const routes: Routes = [
  {
    path: "",
    component: Screen1Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Screen1RoutingModule {}
