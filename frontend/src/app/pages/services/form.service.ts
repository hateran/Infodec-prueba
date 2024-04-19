import { Injectable } from "@angular/core";
import { ICity, ICountry } from "../screen-1/interfaces";

interface IForm {
  selectedCountry?: ICountry;
  selectedCity?: ICity;
  savings?: number;
}

@Injectable({
  providedIn: "root",
})
export class FormService {
  public form: IForm = {};
}
