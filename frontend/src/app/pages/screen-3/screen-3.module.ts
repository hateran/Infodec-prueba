import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Screen3RoutingModule } from "./screen-3-routing.module";
import { Screen3Component } from "./screen-3.component";

@NgModule({
  declarations: [Screen3Component],
  imports: [CommonModule, Screen3RoutingModule],
})
export class Screen3Module {}
