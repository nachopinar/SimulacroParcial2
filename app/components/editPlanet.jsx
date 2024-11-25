import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter, useSearchParams } from "expo-router"; // Para obtener parámetros de la URL

const EditPlanet = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [moons, setMoons] = useState("");
  const [moonNames, setMoonNames] = useState("");
  const [image, setImage] = useState("");
  const { id } = useSearchParams(); // Obtener el ID del planeta desde los parámetros de la URL
  const router = useRouter();

  // Función para obtener los datos del planeta a editar
  const getPlanet = async () => {
    try {
      const response = await fetch(`http://192.168.48.64:8000/planets/${id}`);
      if (response.ok) {
        const planet = await response.json();
        setName(planet.name);
        setDescription(planet.description);
        setMoons(planet.moons.toString());
        setMoonNames(planet.moon_names.join(", "));
        setImage(planet.image);
      } else {
        Alert.alert("Error", "No se pudo obtener el planeta");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Alert.alert("Error", "Error al obtener los detalles del planeta");
    }
  };

  // Cargar los datos del planeta al cargar el componente
  useEffect(() => {
    if (id) {
      getPlanet();
    }
  }, [id]);

  // Llamada a la API para editar un planeta
  const editPlanet = async () => {
    try {
      const payload = {
        name,
        description,
        moons: parseInt(moons, 10), // Asegúrate de convertir a número
        moon_names: moonNames.split(",").map((moon) => moon.trim()), // Convierte en array
        image,
      };

      const response = await fetch(`http://192.168.48.64:8000/planets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Planeta actualizado correctamente");
        Alert.alert("Éxito", "Planeta actualizado correctamente");
        router.push("/planets"); // Redirige a la página de planetas
      } else {
        Alert.alert("Error", "No se pudo actualizar el planeta");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Alert.alert("Error", "Error en la solicitud");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Editar Planeta</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del planeta"
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
            placeholder="Número de lunas"
            value={moons}
            keyboardType="numeric"
            onChangeText={setMoons}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombres de las lunas (separados por comas)"
            value={moonNames}
            onChangeText={setMoonNames}
          />
          <TextInput
            style={styles.input}
            placeholder="URL de la imagen"
            value={image}
            onChangeText={setImage}
          />
          <Button title="Actualizar Planeta" onPress={editPlanet} />
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

export default EditPlanet;
