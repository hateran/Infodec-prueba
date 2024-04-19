import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { RoutesEnum } from "../../enums";
import { CountryService } from "./services/country.service";
import { ICity, ICountry } from "./interfaces";
import { FormService } from "../services/form.service";
import { IParams } from "../../interfaces";
import { StepService } from "../../services/step.service";

@Component({
  selector: "app-screen-1",
  templateUrl: "./screen-1.component.html",
  styleUrl: "./screen-1.component.scss",
})
export class Screen1Component implements OnInit {
  private readonly router = inject(Router);

  private readonly countryService = inject(CountryService);

  private readonly formService = inject(FormService);

  private readonly stepService = inject(StepService);

  public countries: ICountry[] = [];

  public cities: ICity[] = [];

  private readonly defaultParams: Pick<IParams<unknown>, "page" | "limit" | "order"> = {
    page: 1, // This should have an infinite scroll
    limit: 30, // This should have an infinite scroll
    order: "ASC",
  };

  public ngOnInit(): void {
    this.getCountries();
  }

  private getCountries(): void {
    this.countryService.getCountries({ ...this.defaultParams, limit: 100, orderBy: "commonName" }).subscribe({
      next: (response) => {
        if (response.status === 200) this.countries = response.data;
      },
    });
  }

  private getCities({ cca3 }: ICountry): void {
    this.countryService.getCities({ ...this.defaultParams, orderBy: "commonName", cca3 }).subscribe({
      next: (response) => {
        if (response.status === 200) this.cities = response.data;
      },
    });
  }

  public navigate(): void {
    this.stepService.toggleItem(RoutesEnum.SCREEN_2);
    this.router.navigate([RoutesEnum.SCREEN_2]);
  }

  public handleCountryChange(idCountry: string): void {
    this.selectedCountry = idCountry;
    if (this.country) this.getCities(this.country);
  }

  private get country(): ICountry | undefined {
    return this.countries.find((element) => element.idCountry.toString() === this.selectedCountry);
  }

  public get selectedCountry(): string {
    return this.formService.form.selectedCountry?.idCountry.toString() ?? "";
  }

  public set selectedCountry(idCountry: string) {
    const country = this.countries.find((element) => element.idCountry.toString() === idCountry);
    this.formService.form.selectedCountry = country;
  }

  public get selectedCity(): string {
    return this.formService.form.selectedCity?.idCity.toString() ?? "";
  }

  public set selectedCity(idCity: string) {
    const city = this.cities.find((element) => element.idCity.toString() === idCity);
    this.formService.form.selectedCity = city;
  }

  public get isDisabled(): boolean {
    return !this.selectedCountry || this.selectedCountry === "" || !this.selectedCity || this.selectedCity === "";
  }
}
