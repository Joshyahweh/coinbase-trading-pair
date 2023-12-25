import axios from "axios";

import { API_BASE_URL } from "./base_url";
import {
  CoinbaseProTradingPair,
  TradingPair,
} from "../interfaces/trading-pairs";

export const fetchCryptoPairs = async (): Promise<TradingPair[]> => {
  try {
    const response = await axios.get(` ${API_BASE_URL}/products`);
    return response.data.map((apiResponse: any) =>
      mapToTradingPair(apiResponse)
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const mapToTradingPair = (apiResponse: any): TradingPair => {
  return {
    id: apiResponse.id,
    baseCurrency: apiResponse.base_currency,
    quoteCurrency: apiResponse.quote_currency,
    status: apiResponse.status,
  };
};

export const mapToCoinbaseProTradingPair = (
  apiResponse: any
): CoinbaseProTradingPair => {
  const commonModel = mapToTradingPair(apiResponse);
  return {
    ...commonModel,
    currentPrice: apiResponse.current_price,
  };
};
