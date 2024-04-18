import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { Screen3Component } from "./screen-3.component";

const routes: Routes = [
  {
    path: "",
    component: Screen3Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Screen3RoutingModule {}
