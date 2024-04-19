import { Injectable } from "@angular/core";
import { MenuItem } from "primeng/api";
import { STEPPER_OPTIONS } from "../constants";
import { RoutesEnum } from "../enums";

@Injectable({
  providedIn: "root",
})
export class StepService {
  private readonly options = STEPPER_OPTIONS;

  public toggleItem(route: RoutesEnum): void {
    const option = this.options.find((element) => element.routerLink === route);
    if (option) option.disabled = !option.disabled;
  }

  public get items(): MenuItem[] {
    return this.options;
  }
}
