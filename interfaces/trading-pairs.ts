export interface TradingPair {
  id: string;
  baseCurrency: string;
  quoteCurrency: string;
  status: "online" | "delisted"
}

export interface CoinbaseProTradingPair extends TradingPair {
  currentPrice: number;
}
