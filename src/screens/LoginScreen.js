import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../config/firebase';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';
import { CLIENTE_ID } from '@env';


WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: CLIENTE_ID,
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;

            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then(() => {
                    navigation.replace('Home');
                })
                .catch((error) => {
                    Alert.alert('Error', error.message);
                });
        }
    }, [response]);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Se ha iniciado correctamente sesión', 'Ahora puedes agregar productos');
            navigation.replace('Home');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleGoogleLogin = () => {
        promptAsync();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <InputComponent
                label="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                placeholder="Correo electrónico"
                keyboardType="email-address"
            />
            <InputComponent
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                placeholder="Contraseña"
                secureTextEntry
            />
            <ButtonComponent
                title="Iniciar Sesión"
                onPress={handleLogin}
            />
            <ButtonComponent
                title="Iniciar Sesión con Google"
                onPress={handleGoogleLogin}
            />
            <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                ¿No tienes cuenta? Crear cuenta
            </Text>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    link: {
        color: '#0288d1',
        textAlign: 'center',
        marginTop: 20,
        textDecorationLine: 'underline',
    },
});
