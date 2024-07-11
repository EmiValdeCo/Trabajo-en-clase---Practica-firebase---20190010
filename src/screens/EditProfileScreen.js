import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { database } from '../config/firebase';

const EditProfileScreen = () => {
    const [userData, setUserData] = useState({});
    const auth = getAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(database, 'users', auth.currentUser.uid));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        };

        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            await setDoc(doc(database, 'users', auth.currentUser.uid), userData, { merge: true });
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Perfil</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                value={userData.fullName || ''}
                onChangeText={text => setUserData({ ...userData, fullName: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de teléfono"
                value={userData.phone || ''}
                onChangeText={text => setUserData({ ...userData, phone: text.replace(/[^0-9-]/g, '').replace(/(\d{4})(\d)/, '$1-$2') })}
                keyboardType="phone-pad"
                maxLength={9}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha de nacimiento (DD/MM/AAAA)"
                value={userData.birthDate || ''}
                onChangeText={text => setUserData({ ...userData, birthDate: text })}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditProfileScreen;

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
});
