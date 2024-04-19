import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { RoutesEnum } from "../../enums";
import { FormService } from "../services/form.service";
import { StepService } from "../../services/step.service";

@Component({
  selector: "app-screen-2",
  templateUrl: "./screen-2.component.html",
  styleUrl: "./screen-2.component.scss",
})
export class Screen2Component implements OnInit {
  private readonly router = inject(Router);

  private readonly formService = inject(FormService);

  private readonly stepService = inject(StepService);

  public ngOnInit(): void {
    if (!this.formService.form.selectedCountry || !this.formService.form.selectedCity) return this.navigateBack();
  }

  public navigateBack(): void {
    this.router.navigate([RoutesEnum.SCREEN_1]);
  }

  public navigate(): void {
    this.stepService.toggleItem(RoutesEnum.SCREEN_3);
    this.router.navigate([RoutesEnum.SCREEN_3]);
  }

  public get savings(): string {
    return this.formService.form.savings?.toString() ?? "";
  }

  public set savings(value: string) {
    this.formService.form.savings = +value;
  }
}
