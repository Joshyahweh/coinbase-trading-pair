import axios from "axios";
import { API_BASE_URL } from "./base_url";

export const fetchCryptoPairPrice = async (
  productId: string
): Promise<number> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/products/${productId}/ticker`
    );
    const price = parseFloat(response.data.price);
    return price;
  } catch (error) {
    console.error("Error fetching crypto pair price:", error);
    throw error;
  }
};

