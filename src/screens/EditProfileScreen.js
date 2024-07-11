import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { database } from '../config/firebase';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';

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
            Alert.alert('Se ha actualizado', 'Perfil actualizado correctamente');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Perfil</Text>
            <InputComponent
                label="Nombre completo"
                value={userData.fullName || ''}
                onChangeText={text => setUserData({ ...userData, fullName: text })}
                placeholder="Nombre completo"
            />
            <InputComponent
                label="Número de teléfono"
                value={userData.phone || ''}
                onChangeText={text => setUserData({ ...userData, phone: text.replace(/[^0-9-]/g, '').replace(/(\d{4})(\d)/, '$1-$2') })}
                placeholder="Número de teléfono"
                keyboardType="phone-pad"
                maxLength={9}
            />
            <InputComponent
                label="Fecha de nacimiento (DD/MM/AAAA)"
                value={userData.birthDate || ''}
                onChangeText={text => setUserData({ ...userData, birthDate: text })}
                placeholder="Fecha de nacimiento (DD/MM/AAAA)"
            />
            <ButtonComponent
                title="Guardar"
                onPress={handleSave}
            />
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
});
