import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Screen3RoutingModule } from "./screen-3-routing.module";
import { Screen3Component } from "./screen-3.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CardComponent } from "../../lib";

@NgModule({
  declarations: [Screen3Component],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, Screen3RoutingModule, CardComponent],
})
export class Screen3Module {}
