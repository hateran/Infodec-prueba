import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Screen1Component } from "./screen-1.component";
import { Screen1RoutingModule } from "./screen-1-routing.module";
import { CardComponent } from "../../lib";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [Screen1Component],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Screen1RoutingModule, DropdownModule, CardComponent],
})
export class Screen1Module {}
