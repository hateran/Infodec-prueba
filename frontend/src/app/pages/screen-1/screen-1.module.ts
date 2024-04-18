import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Screen1Component } from "./screen-1.component";
import { Screen1RoutingModule } from "./screen-1-routing.module";

@NgModule({
  declarations: [Screen1Component],
  imports: [CommonModule, Screen1RoutingModule],
})
export class Screen1Module {}
