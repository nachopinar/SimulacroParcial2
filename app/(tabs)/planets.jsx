import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Button,
  TextInput,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const ImageCard = ({ image, description, name, onPress }) => (
  <View style={styles.imageCard}>
    <Text style={styles.text}>{name}</Text>
    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.description}>{description}</Text>
    <Button title="Details" onPress={onPress} />
  </View>
);

const App = () => {
  const [cards, setCards] = useState([]); // Estado para las tarjetas
  const [selectedCard, setSelectedCard] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
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
    setSelectedCard(card); // Guarda la tarjeta seleccionada (si se necesita en el futuro)
    router.push(`../components/planetDetails?id=${id}`); // Navega a la página con el id del planeta
  };

  const handleSave = () => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === selectedCard.id
          ? { ...card, title, description, source }
          : card
      )
    );
    setSelectedCard(null);
    setTitle("");
    setDescription("");
    setSource("");
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
              description={card.description}
              onPress={() => handleOnPress(card.id)}
            />
          ))}
        </ScrollView>
        {selectedCard && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="URL de la imagen"
              value={source}
              onChangeText={setSource}
            />
            <Button title="Guardar" onPress={handleSave} />
          </View>
        )}
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
  description: {
    fontSize: 16,
    paddingTop: 8,
    textAlign: "center",
    fontWeight: "bold",
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
  inputContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default App;
