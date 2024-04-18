import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { Screen2Component } from "./screen-2.component";

const routes: Routes = [
  {
    path: "",
    component: Screen2Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Screen2RoutingModule {}
