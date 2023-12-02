import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      const body = {
        userName: username,
        email: email,
        password: password,
      };

      const response = await axios.post(
        "https://bloggler-backend.vercel.app/api/user/signup",
        body
      );

      console.log("Signup successful:", response.data);
      await AsyncStorage.setItem("userData", JSON.stringify(...response.data));
      alert("Signup successful!");
      navigation.navigate('Home');
    } catch (error) {
      console.log("Error during signup:", error);

      
      const errorMessage = error?.response?.data?.message || "Unknown error";
      console.log("Error message:", errorMessage);

      alert(`Error during signup: ${errorMessage}. Please try again.`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.whiteBox}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          signUp();
          navigation.navigate("Login"); 
        }}
      >
        
        <Text style={styles.buttonText}>Sign UP</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: '#E1F6FF',      
  },
  whiteBox: {               
   
    width: '40%',                  
    height: '60%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign:'center'
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    height:60,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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