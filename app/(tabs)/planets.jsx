import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Button,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const ImageCard = ({ image, name, onPress }) => (
  <View style={styles.imageCard}>
    <Text style={styles.text}>{name}</Text>
    <Image source={{ uri: image }} style={styles.image} />
    <Button title="Details" onPress={onPress} />
  </View>
);

const App = () => {
  const [cards, setCards] = useState([]); // Estado para las tarjetas
  const router = useRouter(); // Inicializar router

  // Simulación de llamada a la API (ajusta la URL a tu API)
  const getPlanetas = async () => {
    try {
      const response = await fetch("http://192.168.48.64:8000/planets");
      if (response.ok) {
        const data = await response.json();
        setCards(data); // Poblar el estado `cards` con los datos obtenidos
      } else {
        console.error("Error al obtener los datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    getPlanetas();
  }, []);

  const handleOnPress = (id) => {
    const card = cards.find((card) => card.id === id);

    // Serializar los datos de la tarjeta y pasarlos como parámetros de búsqueda
    const queryParams = new URLSearchParams({
      name: card.name,
      description: card.description,
      moons: card.moons,
      moon_names: JSON.stringify(card.moon_names),
    }).toString();

    // Navegar a PlanetDetails con los parámetros de búsqueda
    router.push(`../components/planetDetails?${queryParams}`);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {cards.map((card) => (
            <ImageCard
              key={card.id}
              name={card.name}
              image={card.image}
              onPress={() => handleOnPress(card.id)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    paddingVertical: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 28,
    padding: 6,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  imageCard: {
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    width: 220,
  },
});

export default App;
