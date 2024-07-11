import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import TextInputComponent from '../components/TextInputComponent';
import PhoneInputComponent from '../components/PhoneInputComponent';
import DatePickerComponent from '../components/DatePickerComponent';
import ButtonComponent from '../components/ButtonComponent';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const handleRegister = async () => {
        try {
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
                Alert.alert('Error', 'El correo electrónico no es válido.');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(database, 'users', user.uid), {
                email,
                fullName,
                phone,
                birthDate,
            });
            
            Alert.alert('Cuenta creada correctamente', 'Ahora puedes iniciar sesión');
            
            navigation.replace('Login');
        } catch (error) {
            Alert.alert('Error', error.message);
            console.log('Error', error.message);
        }
    };

    const handleNavegation = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Cuenta</Text>
            <TextInputComponent
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInputComponent
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInputComponent
                placeholder="Nombre completo"
                value={fullName}
                onChangeText={setFullName}
            />
            <PhoneInputComponent
                placeholder="Número de teléfono"
                value={phone}
                onChangeText={setPhone}
            />
            <DatePickerComponent
                value={birthDate}
                onChangeText={setBirthDate}
            />
            <ButtonComponent
                title="Registrar"
                onPress={handleRegister}
            />
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                ¿Ya tienes cuenta?
            </Text>
            <ButtonComponent
                title="Inicial Sesión"
                onPress={handleNavegation}
            />
        </View>
    );
};

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

export default RegisterScreen;
