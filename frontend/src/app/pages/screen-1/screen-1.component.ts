import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { RoutesEnum } from "../../enums";

@Component({
  selector: "app-screen-1",
  templateUrl: "./screen-1.component.html",
  styleUrl: "./screen-1.component.scss",
})
export class Screen1Component {
  private readonly router = inject(Router);

  public navigate(): void {
    this.router.navigate([RoutesEnum.SCREEN_2]);
  }

  public get countries() {
    return [
      {
        name: "Inglaterra",
        translationKey: "England",
      },
      {
        name: "Japon",
        translationKey: "Japan",
      },
      {
        name: "India",
        translationKey: "India",
      },
      {
        name: "Dinamarca",
        translationKey: "Denmark",
      },
      {
        name: "Colombia",
        translationKey: "Colombia",
      },
    ];
  }

  public get cities() {
    return [
      {
        name: "Pereira",
        translationKey: "Pereira",
      },
    ];
  }
}
