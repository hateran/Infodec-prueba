/* eslint-disable @typescript-eslint/naming-convention */
interface ICurrencyExchange {
  "5. Exchange Rate": string;
}

export type CurrencyResponseType = Record<string, ICurrencyExchange>;
