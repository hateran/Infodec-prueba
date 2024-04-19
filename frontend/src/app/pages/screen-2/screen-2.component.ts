import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { RoutesEnum } from "../../enums";

@Component({
  selector: "app-screen-2",
  templateUrl: "./screen-2.component.html",
  styleUrl: "./screen-2.component.scss",
})
export class Screen2Component {
  private readonly router = inject(Router);

  public navigateBack(): void {
    this.router.navigate([RoutesEnum.SCREEN_1]);
  }

  public navigate(): void {
    this.router.navigate([RoutesEnum.SCREEN_3]);
  }
}
