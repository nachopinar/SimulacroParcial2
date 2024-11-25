import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";

const PlanetDetails = () => {
  const params = useLocalSearchParams();
  const { id, name, description, moons, moon_names } = params;
  const router = useRouter();
  console.log("id de este planeta:", params.id);

  // Verificar y convertir valores de parámetros
  const initialMoonList = moon_names ? JSON.parse(moon_names) : [];
  const initialMoons = moons ? parseInt(moons, 10) : 0;

  // Estados para editar
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(name || "");
  const [newDescription, setNewDescription] = useState(description || "");
  const [newMoons, setNewMoons] = useState(initialMoons.toString());
  const [newMoonList, setNewMoonList] = useState(initialMoonList.join(", "));

  // Función para guardar cambios (PUT)
  const handleSave = async () => {
    try {
      const updatedData = {
        name: newName,
        description: newDescription,
        moons: parseInt(newMoons, 10),
        moon_names: newMoonList.split(",").map((moon) => moon.trim()),
      };

      const response = await fetch(`http://192.168.48.64:8000/planets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        Alert.alert("Success", "Planet updated successfully!");
        setEditMode(false); // Salir del modo de edición
      } else {
        Alert.alert("Error", "Failed to update planet.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating the planet.");
      console.error(error);
    }
  };

  // Función para eliminar (DELETE)
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://192.168.48.64:8000/planets/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Alert.alert("Deleted", "Planet deleted successfully!");
        router.push("/"); // Redirigir a la pantalla principal tras eliminar
      } else {
        Alert.alert("Error", "Failed to delete planet.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while deleting the planet.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {editMode ? (
        // Vista de edición
        <View>
          <Text style={styles.subtitle}>Edit Planet</Text>
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
            value={newMoons}
            onChangeText={setNewMoons}
            placeholder="Number of Moons"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={newMoonList}
            onChangeText={setNewMoonList}
            placeholder="Moon Names (comma-separated)"
          />
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setEditMode(false)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Vista normal
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.moons}>Total moons: {moons}</Text>

          <Text style={styles.subtitle}>Top 5 Moons:</Text>
          <FlatList
            data={initialMoonList.slice(0, 5)} // Mostrar las primeras 5 lunas
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.moonItem}>{item}</Text>
            )}
          />

          <TouchableOpacity
            onPress={() => {
              console.log("Entering Edit Mode");
              setEditMode(true); // Activa el modo de edición
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={[styles.button, styles.deleteButton]}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
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
});
