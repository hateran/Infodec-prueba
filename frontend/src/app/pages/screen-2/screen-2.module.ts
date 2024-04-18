import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Screen2RoutingModule } from "./screen-2-routing.module";
import { Screen2Component } from "./screen-2.component";

@NgModule({
  declarations: [Screen2Component],
  imports: [CommonModule, Screen2RoutingModule],
})
export class Screen2Module {}
