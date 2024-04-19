import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { RoutesEnum } from "../../enums";
import { StepService } from "../../services/step.service";
import { FormService } from "../services/form.service";
import { UtilService } from "./services/util.service";

@Component({
  selector: "app-screen-3",
  templateUrl: "./screen-3.component.html",
  styleUrl: "./screen-3.component.scss",
})
export class Screen3Component implements OnInit {
  private readonly router = inject(Router);

  private readonly formService = inject(FormService);

  private readonly stepService = inject(StepService);

  private readonly utilService = inject(UtilService);

  public additionalData = {
    weather: 0,
    localCurrency: "",
    currencyExchange: "",
    exchangeRate: "",
  };

  public ngOnInit(): void {
    if (!this.formService.form.savings) return this.navigateBack();
    this.getResources();
  }

  private getResources(): void {
    this.utilService.getWeather(this.selectedCountry).subscribe({
      next: (response) => {
        this.additionalData.weather = response.timelines.minutely[0].values.temperature;
      },
    });
    this.utilService.getCountryInfo(this.formService.form.selectedCountry?.cca3 ?? "").subscribe({
      next: (response) => {
        Object.entries(response.currencies).forEach(([key]) => {
          const symbol = response.currencies[key].symbol;
          this.additionalData.localCurrency = `${symbol} ${response.currencies[key].name}`;
          this.utilService.getCurrencyConversion(key).subscribe({
            next: (responseCurrency) => {
              Object.entries(responseCurrency).forEach(([key]) => {
                this.additionalData.exchangeRate = responseCurrency[key]["5. Exchange Rate"];
                this.additionalData.currencyExchange = `${symbol} ${this.savings / +this.additionalData.exchangeRate}`;
              });
            },
          });
          return;
        });
      },
    });
  }

  public navigateBack(): void {
    this.router.navigate([RoutesEnum.SCREEN_2]);
  }

  public navigateToStart(): void {
    this.stepService.toggleItem(RoutesEnum.SCREEN_2);
    this.stepService.toggleItem(RoutesEnum.SCREEN_3);
    this.router.navigate([RoutesEnum.SCREEN_1]);
  }

  public get selectedCountry(): string {
    return this.formService.form.selectedCountry?.commonName ?? "";
  }

  public get selectedCity(): string {
    return this.formService.form.selectedCity?.commonName ?? "";
  }

  public get savings(): number {
    return this.formService.form.savings ?? 0;
  }
}
