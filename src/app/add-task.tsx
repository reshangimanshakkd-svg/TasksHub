import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddTaskScreen() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const saveTask = async () => {
    if (!taskName.trim() || !taskDescription.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const existingTasks = await AsyncStorage.getItem("tasks");
      const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];

      const newTask = {
        id: Date.now().toString(),
        taskName: taskName.trim(),
        taskDescription: taskDescription.trim(),
      };
      tasksArray.push(newTask);

      await AsyncStorage.setItem("tasks", JSON.stringify(tasksArray));

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Task Saved Successfully!",
          body: `Don't forget to complete your ${newTask.taskName}.`,
        },
        trigger: null,
      });

      router.back();
    } catch (error) {
      console.error("Failed to save task", error);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.magnific.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg?semt=ais_hybrid&w=740&q=80",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/016/921/110/non_2x/business-task-management-illustration-concept-on-white-background-vector.jpg",
          }}
          style={styles.banner}
          resizeMode="contain"
        />

        <Text style={styles.label}>Task Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task name"
          value={taskName}
          onChangeText={setTaskName}
        />

        <Text style={styles.label}>Task Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter task description"
          value={taskDescription}
          onChangeText={setTaskDescription}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.button} onPress={saveTask}>
          <Text style={styles.buttonText}>Save Task</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.88)",
  },
  banner: {
    width: "100%",
    height: 160,
    marginBottom: 16,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#222",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 14,
  },
  textArea: {
    minHeight: 100,
  },
  button: {
    backgroundColor: "#1b5e20",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
