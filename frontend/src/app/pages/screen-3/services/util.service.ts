/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { CurrencyResponseType, ICountryInfoResponse, IWeatherResponse } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class UtilService {
  private readonly WEATHER_URL = "https://api.tomorrow.io";

  private readonly COUNTRY_INFO_URL = "https://countryinfoapi.com";

  private readonly CURRENCY_URL = "https://alpha-vantage.p.rapidapi.com";

  private readonly httpClient = inject(HttpClient);

  public getWeather(location: string): Observable<IWeatherResponse> {
    return this.httpClient.get<IWeatherResponse>(`${this.WEATHER_URL}/v4/weather/forecast`, {
      params: { location, apikey: environment.WEATHER_API_KEY },
    });
  }

  public getCountryInfo(cca3: string): Observable<ICountryInfoResponse> {
    return this.httpClient.get<ICountryInfoResponse>(`${this.COUNTRY_INFO_URL}/api/countries/${cca3}`);
  }

  public getCurrencyConversion(to_currency: string): Observable<CurrencyResponseType> {
    const from_currency = "COP";
    return this.httpClient.get<CurrencyResponseType>(`${this.CURRENCY_URL}/query`, {
      headers: new HttpHeaders({ "X-RapidAPI-Key": environment.CURRENCY_API_KEY }),
      params: { from_currency, to_currency, function: "CURRENCY_EXCHANGE_RATE" },
    });
  }
}
