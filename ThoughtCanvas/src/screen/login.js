import React, { useState } from "react";
import { toast } from 'react-toastify';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = async () => {
    try {
      const body = {
        userName: username,
        email: email,
        password: password,
      };

      const response = await axios.post(
        "https://bloggler-backend.vercel.app/api/user/login",
        body
      );

      console.log("Login successful:", response.data);
     
      await AsyncStorage.setItem("userData", JSON.stringify(response.data,username));
      toast.success('Login successful', {
        position: 'top-center',
        autoClose: 3000,
      });
      navigation.navigate('Home');
    } catch (error) {
      console.log("Error during Login:", error);

      
      const errorMessage =  toast.error(error?.response?.data?.message, {
        position: 'top-center',
        autoClose: 3000,
      });
      console.log("Error message:", errorMessage);

      alert(`Error during Login: ${errorMessage}. Please try again.`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.whiteBox}>
        <Text style={styles.title}>Login</Text>

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
            Login();
            navigation.navigate("signUp");
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signupLink}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1F6FFF',
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
  signupLink: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#3498db', 
    marginLeft: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 80,
    textAlign:"center",
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
