import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Home from '../screens/Home';
import AgregarProducto from '../screens/AgregarProducto';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="AgregarProducto" component={AgregarProducto} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Edit" component={EditProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
