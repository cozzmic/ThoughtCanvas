import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Login from './src/screen/login';
import Signup from './src/screen/signup';
import Home from './src/screen/Home';
import CreatePost from './src/screen/post';

const Stack = createStackNavigator();

const CustomHeader = ({ route, navigation }) => {
  const username = route.params?.username || 'Guest';
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    setDropdownVisible(false); 
  };

  const handleLogout = () => {
   
    alert('Logout successfully');
    
    navigation.navigate('Login');
    setDropdownVisible(false); 
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>ThoughtCanvas</Text>
      <View style={styles.rightHeader}>
        <TouchableOpacity
          onPress={() => navigateToScreen('Home')}
          style={styles.headerButton}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToScreen('CreatePost')}
          style={styles.headerButton}
        >
          <Text style={styles.buttonText}>Create Post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDropdown} style={styles.userContainer}>
          <Ionicons name="person-circle" size={30} color="white" />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{username}</Text>
          </View>
        </TouchableOpacity>
        {/* Modal for the dropdown */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={isDropdownVisible}
        >
          <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          header: ({ route, navigation }) => (
            <CustomHeader route={route} navigation={navigation} />
          ),
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
    padding: '1%',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: '#2980b9',
  },
  buttonText: {
    color: 'white',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '2%',
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  dropdownItem: {
    backgroundColor: '#2980b9',
    padding: 15,
  },
  dropdownText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;