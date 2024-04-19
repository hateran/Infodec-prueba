import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { IGenericListResponse, IParams } from "../../../interfaces";
import { ICity, ICountry, IParamsCityType } from "../interfaces";
import { GenericParamsType } from "../../../types";

@Injectable({
  providedIn: "root",
})
export class CountryService {
  private readonly httpClient = inject(HttpClient);

  public getCountries(params: IParams<ICountry>): Observable<IGenericListResponse<ICountry>> {
    return this.httpClient.get<IGenericListResponse<ICountry>>(`${environment.API_URL}/country`, {
      params: new HttpParams({ fromObject: params as unknown as GenericParamsType }),
    });
  }

  public getCities(params: IParamsCityType): Observable<IGenericListResponse<ICity>> {
    return this.httpClient.get<IGenericListResponse<ICity>>(`${environment.API_URL}/city`, {
      params: new HttpParams({ fromObject: params as unknown as GenericParamsType }),
    });
  }
}
