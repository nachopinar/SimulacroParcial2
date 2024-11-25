import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const ImageCard = ({
  id,
  name,
  difficulty,
  onPress,
  isFavorite,
  handleDelete,
}) => (
  <View style={styles.imageCard}>
    <Text style={styles.text}>{name}</Text>
    <Text style={styles.text}>{difficulty}</Text>
    <Text style={styles.isFavorite}>{isFavorite}</Text>
    <Button title="Edit" onPress={onPress} />
    <Button title="Delete" onPress={handleDelete} />
  </View>
);

const App = () => {
  const [cards, setCards] = useState([]); // Estado para las tarjetas
  const router = useRouter(); // Inicializar router

  // Función para obtener los planetas
  const getPlanetas = async () => {
    try {
      const response = await fetch("http://192.168.48.64:8000/destinations"); // Ajusta tu IP/URL
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

  // Hook que se ejecuta cada vez que la pantalla gana foco
  useFocusEffect(
    useCallback(() => {
      getPlanetas();
    }, []) // Dependencias vacías para que solo se ejecute al ganar foco
  );

  const handleOnPress = (id) => {
    const card = cards.find((card) => card.id === id);

    // Serializar los datos de la tarjeta y pasarlos como parámetros de búsqueda
    const queryParams = new URLSearchParams({
      id: card.id.toString(),
      name: card.name,
      description: card.description,
      difficulty: card.difficulty,
      isFavorite: card.isFavorite,
    }).toString();

    // Navegar a PlanetDetails con los parámetros de búsqueda
    router.push(`../components/planetDetails?${queryParams}`);
  };

  //----------------------------

  const deletePlaneta = async (id) => {
    try {
      const response = await fetch(
        `http://192.168.48.64:8000/destinations/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        getPlanetas();
      } else {
        console.error("Error al obtener los datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleDelete = (id) => {
    console.log("hola");
    const card = cards.find((card) => card.id === id);

    deletePlaneta(card.id);

    // const response = await fetch(
    //   "http://192.168.48.64:8000/destinations/${id}",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   }
    // );

    // Navegar a PlanetDetails con los parámetros de búsqueda
    router.push(`/planets`);
  };

  //------------------------------

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {cards.map((card) => (
            <ImageCard
              key={card.id}
              name={card.name}
              difficulty={card.difficulty}
              isFavorite={card.isFavorite}
              //image={card.image}
              onPress={() => handleOnPress(card.id)}
              handleDelete={() => handleDelete(card.id)}
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

  isFavorite: {
    backgroundColor: "blue",
    width: 50,
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
