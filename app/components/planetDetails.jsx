import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const PlanetDetails = () => {
  const params = useLocalSearchParams();
  const { id, name, description, difficulty, isFavorite } = params;
  const router = useRouter();
  console.log("id de este planeta:", params.id);

  // Verificar y convertir valores de parámetros

  // Estados para editar
  //const [editMode, setEditMode] = useState(true);
  const [newName, setNewName] = useState(name || "");
  const [newDescription, setNewDescription] = useState(description || "");
  const [newDifficulty, setNewDifficulty] = useState(difficulty || "");
  const [newIsFavorite, setNewIsFavorite] = useState(isFavorite || "");

  // Función para guardar cambios (PUT)
  const handleSave = async () => {
    console.log("holazaaa");
    try {
      const updatedData = {
        name: newName,
        description: newDescription,
        difficulty: newDifficulty,
        isFavorite: newIsFavorite,
      };

      const response = await fetch(
        `http://192.168.48.64:8000/destinations/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Planet updated successfully!");
        //setEditMode(false); // Salir del modo de edición
        router.push("../(tabs)/planets");
      } else {
        Alert.alert("Error", "Failed to update planet.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating the planet.");
      console.error(error);
    }
  };

  // Función para eliminar (DELETE)
  // const handleDelete = async () => {
  //   try {
  //     const response = await fetch(`http://192.168.48.64:8000/planets/${id}`, {
  //       method: "DELETE",
  //     });

  //     if (response.ok) {
  //       Alert.alert("Deleted", "Planet deleted successfully!");
  //       router.push("/"); // Redirigir a la pantalla principal tras eliminar
  //     } else {
  //       Alert.alert("Error", "Failed to delete planet.");
  //     }
  //   } catch (error) {
  //     Alert.alert("Error", "An error occurred while deleting the planet.");
  //     console.error(error);
  //   }
  // };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.subtitle}>Edit Destination</Text>
        <TextInput
          style={styles.input}
          value={newName}
          onChangeText={setNewName}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={newDescription}
          onChangeText={setNewDescription}
          placeholder="Description"
        />
        <TextInput
          style={styles.input}
          value={newDifficulty}
          onChangeText={setNewDifficulty}
          placeholder="Dificulty"
          // keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={newIsFavorite}
          onChangeText={setNewIsFavorite}
          placeholder="Es favorito?"
        />
        <TouchableOpacity onPress={handleSave} style={styles.button}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => setEditMode(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    </SafeAreaProvider>
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
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#f44336",
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
