interface ICurrencyValue {
  name: string;
  symbol: string;
}

type ICurrency = Record<string, ICurrencyValue>;

export interface ICountryInfoResponse {
  currencies: ICurrency;
}
