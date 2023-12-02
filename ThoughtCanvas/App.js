import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; 

import Login from './src/screen/login';
import Signup from './src/screen/signup';
import Home from './src/screen/Home';
import CreatePost from './src/screen/post';

const Stack = createStackNavigator();

const CustomHeader = ({ route }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity
      onPress={() => route.navigation.openDrawer()}
      style={styles.menuIcon}
    >
      <Ionicons name="menu" size={30} color="white" />
    </TouchableOpacity>
    <Text style={styles.headerText}>ThoughtCanvas</Text>
    <View style={{ width: 40 }} />
  </View>
);


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: 'Signup' }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{ title: 'Create Post' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#3498db',
    height: '100%',
    padding: '1%'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  menuIcon: {
    marginRight: 15,
  },
});

export default App;
