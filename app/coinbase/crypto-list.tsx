import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchCryptoPairs } from "../../api/fetch-crypto-pairs";
import { Ionicons } from "@expo/vector-icons";
import { TradingPair } from "../../interfaces/trading-pairs";
import { Link } from "expo-router";

const CryptoListScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [cryptoList, setCryptoList] = useState<TradingPair[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const pairs = await fetchCryptoPairs();
      setCryptoList(pairs);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem("favorites");
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Error saving favorites:", error);
      }
    };

    saveFavorites();
  }, [favorites]);

  const handleToggleFavorite = (productId: string) => {
    const updatedFavorites = favorites.includes(productId)
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];
    setFavorites(updatedFavorites);
  };

  const renderCryptoItem = useMemo(
    () =>
      ({ item }: { item: TradingPair }) =>
        (
          <Link
            href={
              item.status === "online"
                ? `/coinbase/${item.id}`
                : `/coinbase/delisted/${item.id}`
            }
            asChild
          >
            <TouchableOpacity style={styles.cryptoItem}>
              <View style={styles.cryptoItemContainer}>
                <View>
                  <Text
                    style={styles.cryptoItemText}
                  >{`${item.baseCurrency}/${item.quoteCurrency}`}</Text>
                  <Text
                    style={[
                      styles.cryptoStatusText,
                      { color: `${item.status === "online" ? "blue" : "red"}` },
                    ]}
                  >{`${item.status}`}</Text>
                </View>
                <TouchableOpacity onPress={() => handleToggleFavorite(item.id)}>
                  <Ionicons
                    name={
                      favorites.includes(item.id) ? "heart" : "heart-outline"
                    }
                    size={20}
                    color={favorites.includes(item.id) ? "red" : "black"}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Link>
        ),
    [favorites]
  );

  const sortedCryptoList = useMemo(
    () =>
      [...cryptoList].sort((a, b) => {
        const isAFavorite = favorites.includes(a.id);
        const isBFavorite = favorites.includes(b.id);

        if (isAFavorite && !isBFavorite) {
          return -1;
        } else if (!isAFavorite && isBFavorite) {
          return 1;
        } else {
          return 0;
        }
      }),
    [cryptoList, favorites]
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={sortedCryptoList.filter((item) =>
          `${item.baseCurrency}/${item.quoteCurrency}`
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderCryptoItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 20,
  },
  cryptoItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  cryptoItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cryptoItemText: {
    fontSize: 16,
  },
  cryptoStatusText: {
    fontSize: 10,
  },
});

export default CryptoListScreen;
