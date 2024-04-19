import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Screen2RoutingModule } from "./screen-2-routing.module";
import { Screen2Component } from "./screen-2.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CardComponent } from "../../lib";

@NgModule({
  declarations: [Screen2Component],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, Screen2RoutingModule, CardComponent],
})
export class Screen2Module {}
