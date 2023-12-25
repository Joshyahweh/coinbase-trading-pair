import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchCryptoPairPrice } from "../../api/fetch-crypto-pair-price";
import { TradingPair } from "../../interfaces/trading-pairs";
import { useLocalSearchParams } from "expo-router";
import { fetchCryptoPairs } from "../../api/fetch-crypto-pairs";

const CryptoDetailScreen = () => {
  const { id } = useLocalSearchParams(); 
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [cryptoPair, setCryptoPair] = useState<TradingPair | undefined>(
    undefined
  );

  const fetchAndUpdatePrice = async () => {
    try {
      const price = await fetchCryptoPairPrice(id as string);
      setCurrentPrice(price);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  useEffect(() => {
    // Initial fetch of the current price
    fetchAndUpdatePrice();

    // Set up interval to periodically fetch and update the price
    const intervalId = setInterval(fetchAndUpdatePrice, 5000); // Fetch every 5 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [id]); // 'id' to the dependencies array to update when the id changes

  useEffect(() => {
    const fetchData = async () => {
      const pairs = await fetchCryptoPairs();
      const foundCryptoPair = pairs.find((item) => item.id === id);
      setCryptoPair(foundCryptoPair);
    };

    fetchData();
  }, [id]);

  if (!cryptoPair) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {cryptoPair.baseCurrency} / {cryptoPair.quoteCurrency}
      </Text>
      <Text style={styles.price}>{`Current Price: ${
        currentPrice !== null ? `$${currentPrice}` : "Loading..."
      }`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
  },
});

export default CryptoDetailScreen;
