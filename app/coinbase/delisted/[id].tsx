import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TradingPair } from "../../../interfaces/trading-pairs";
import { useLocalSearchParams } from "expo-router";
import { fetchCryptoPairs } from "../../../api/fetch-crypto-pairs";

const CryptoDelistedScreen = () => {
  const { id } = useLocalSearchParams();
  const [cryptoPair, setCryptoPair] = useState<TradingPair | undefined>(
    undefined
  );

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
      <Text style={styles.price}>
        This pair {cryptoPair.baseCurrency}/{cryptoPair.quoteCurrency} is
        delisted.
      </Text>
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

export default CryptoDelistedScreen;

