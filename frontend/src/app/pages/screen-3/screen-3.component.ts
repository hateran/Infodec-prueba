import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { RoutesEnum } from "../../enums";

@Component({
  selector: "app-screen-3",
  templateUrl: "./screen-3.component.html",
  styleUrl: "./screen-3.component.scss",
})
export class Screen3Component {
  private readonly router = inject(Router);

  public navigateBack(): void {
    this.router.navigate([RoutesEnum.SCREEN_2]);
  }

  public navigateToStart(): void {
    this.router.navigate([RoutesEnum.SCREEN_1]);
  }
}
