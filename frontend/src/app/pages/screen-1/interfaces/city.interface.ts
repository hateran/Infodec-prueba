import { IParams } from "../../../interfaces";
import { ICountry } from "./country.interface";

export interface ICity {
  idCity: number;
  idCountry: number;
  commonName: string;
  translationKey: string;
  dateCreated: string;
  dateUpdated: string;
}

export type IParamsCityType = IParams<ICity> & Partial<Pick<ICountry, "cca3">>;
