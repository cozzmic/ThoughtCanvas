import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("API Response:", data);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  
  useEffect(() => {
    const apiUrl = "https://bloggler-backend.vercel.app/api/post";
    fetchPosts(apiUrl)
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => navigation.navigate("CreatePost")}
          >
            <MaterialCommunityIcons name="plus" size={24} color="white" style={styles.boldIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>All Posts</Text>
          <View style={{ flex: 1 }} />
        </View>

        {console.log("Rendered Posts:", posts)}
        <FlatList
          style={styles.flatlist}
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postItem}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postContent}>{item.content}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1F6FF",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "3%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center", 
  },
  plusButton: {
    backgroundColor: "#3498db",
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: '22%',
  },
  boldIcon: {
    fontWeight: "bold",
  },
  flatlist: {
    flex: 1,
    width: "70%",
  },
  postItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#3498db",
    borderWidth: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
  },
});
