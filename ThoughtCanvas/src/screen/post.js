import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreatePost({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");

  const CreatePost = async () => {
    try {
      const body = {
        title: title,
        content: content,
      };

      const response = await axios.post(
        "https://bloggler-backend.vercel.app/api/post",
        body,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTYwYmFiYzYyZTY5NWZmZmM1NjE2MTciLCJ1c2VyTmFtZSI6IkFzaGlzaDExMyIsImVtYWlsIjoiYXNoaXNoMTJAdGVzdC5jb20iLCJpYXQiOjE3MDE0NDA2MzksImV4cCI6MTcwNDAzMjYzOX0.nNQrFYICj67zolvGW14wpD3XQDhEeuOVvJRKJSRAcdA`,
          },
        }
      );

      console.log("Post created successfully:", response.data);

      const username = response.data.username;

      await AsyncStorage.setItem(
        "userData",
        JSON.stringify(response.data, username)
      );
      alert("Post created successfully!");
      setTitle("");
      setcontent("");

      navigation.navigate("Home"); 
    } catch (error) {
      console.log("Error during post:", error);

      const errorMessage = error?.response?.data?.message || "Unknown error";
      console.log("Error message:", errorMessage);

      alert(`Error during post: ${errorMessage}. Please try again.`);
    }
  };
  const onPress=()=>{
    const post= CreatePost();
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Create post</Text>

        <TextInput
          style={styles.input}
          placeholder="title"
          value={title}
          onChangeText={setTitle}
          keyboardType="title"
        />
        <TextInput
          style={styles.input}
          placeholder="content"
          value={content}
          onChangeText={setcontent}
          keyboardType="content"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1F6FF",
  },
  whiteBox: {
    width: "40%",
    height: "60%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
  },
  signupLink: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#3498db",
    marginLeft: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 80,
    textAlign: "center",
  },

  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,

    height: 60,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // padding: 16,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
