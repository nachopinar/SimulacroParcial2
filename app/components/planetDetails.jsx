import { useSearchParams } from "expo-router";
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const PlanetDetails = () => {
  const { name, description, moons, moon_names } = useSearchParams();

  // Convertir moon_names de string a arreglo
  const moonList = JSON.parse(moon_names || "[]");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.moons}>Total moons: {moons}</Text>

      <Text style={styles.subtitle}>Top 5 Moons:</Text>
      <FlatList
        data={moonList.slice(0, 5)} // Mostrar las primeras 5 lunas
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.moonItem}>{item}</Text>}
      />
    </View>
  );
};

export default PlanetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  moons: {
    fontSize: 16,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  moonItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});
