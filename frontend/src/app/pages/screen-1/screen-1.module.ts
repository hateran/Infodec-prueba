import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Screen1Component } from "./screen-1.component";
import { Screen1RoutingModule } from "./screen-1-routing.module";
import { CardComponent } from "../../lib";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [Screen1Component],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, Screen1RoutingModule, CardComponent],
})
export class Screen1Module {}
