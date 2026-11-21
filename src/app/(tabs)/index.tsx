import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface TaskItem {
  id: string;
  taskName: string;
  taskDescription: string;
}

export default function DashboardScreen() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, []),
  );

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Failed to load tasks", error);
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
        <Text style={styles.heading}>Your Tasks</Text>

        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
        >
          {tasks.length === 0 ? (
            <Text style={styles.empty}>No tasks saved yet. Add one!</Text>
          ) : (
            tasks.map((task) => (
              <View key={task.id} style={styles.taskCard}>
                <Text style={styles.taskTitle}>{task.taskName}</Text>
                <Text style={styles.taskDescription}>
                  {task.taskDescription}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/add-task")}
        >
          <Text style={styles.addButtonText}>+ Add New Task</Text>
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 14,
    color: "#111",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  empty: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 40,
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1a237e",
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#1b5e20",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
