import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const AddPlanet = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isFavorite, setIsFavorite] = useState("");
  //const [image, setImage] = useState("");
  const router = useRouter(); // Inicializar router

  // Llamada a la API para agregar un nuevo planeta
  const addPlanet = async () => {
    try {
      const payload = {
        name,
        description,
        isFavorite, // Asegúrate de convertir a número
        difficulty, // Convierte en array
      };

      const response = await fetch("http://192.168.48.64:8000/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Planeta agregado correctamente");
        Alert.alert("Éxito", "Planeta agregado correctamente");
        setName("");
        setDescription("");
        setDifficulty("");
        setIsFavorite("");
        // setImage("");
        router.push("/planets"); // Redirige a la página de planetas
      } else {
        Alert.alert("Error", "No se pudo agregar el planeta");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Alert.alert("Error", "Error en la solicitud");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Agregar un Nuevo Destino</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del destino"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Dificultad"
            value={difficulty}
            // keyboardType="numeric"
            onChangeText={setDifficulty}
          />
          <TextInput
            style={styles.input}
            placeholder="Es Favorito?"
            value={isFavorite}
            onChangeText={setIsFavorite}
          />
          {/* <TextInput
            style={styles.input}
            placeholder="URL de la imagen"
            value={image}
            onChangeText={setImage}
          /> */}
          <Button title="Agregar destino" onPress={addPlanet} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default AddPlanet;
