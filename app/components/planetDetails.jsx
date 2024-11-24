import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useSearchParams } from "expo-router";

const PlanetDetails = () => {
  const { planet } = useSearchParams(); // Recuperar los parámetros enviados
  const planetData = JSON.parse(planet); // Parsear el string a un objeto

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{planetData.name}</Text>
      <Image source={{ uri: planetData.image }} style={styles.image} />
      <Text style={styles.description}>{planetData.description}</Text>
      <Text style={styles.info}>Número de lunas: {planetData.moons}</Text>
      {planetData.moon_names.length > 0 && (
        <View style={styles.moonContainer}>
          <Text style={styles.info}>Lunas (máximo 5):</Text>
          {planetData.moon_names.slice(0, 5).map((moon, index) => (
            <Text key={index} style={styles.moon}>
              {moon}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  moonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  moon: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});

export default PlanetDetails;
