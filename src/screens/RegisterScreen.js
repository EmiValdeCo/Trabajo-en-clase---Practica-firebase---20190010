import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(database, 'users', user.uid), {
                email,
                fullName,
                phone,
                birthDate,
            });

            navigation.replace('Login');
        } catch (error) {
            Alert.alert('Error', error.message);
            console.log('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Cuenta</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de teléfono"
                value={phone}
                onChangeText={text => setPhone(text.replace(/[^0-9-]/g, '').replace(/(\d{4})(\d)/, '$1-$2'))}
                keyboardType="phone-pad"
                maxLength={9}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha de nacimiento (DD/MM/AAAA)"
                value={birthDate}
                onChangeText={setBirthDate}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                ¿Ya tienes cuenta? Iniciar sesión
            </Text>
        </View>
    );
};

export default RegisterScreen;

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
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    link: {
        color: '#0288d1',
        textAlign: 'center',
        marginTop: 20,
        textDecorationLine: 'underline',
    },
});
