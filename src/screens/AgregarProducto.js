import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import { database, storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';

const AgregarProducto = ({ navigation }) => {
    const [producto, setProducto] = useState({
        nombre: '',
        precio: 0,
        vendido: false,
        creado: new Date(),
        imagen: ''
    });

    const [loading, setLoading] = useState(false);

    const goToHome = () => {
        navigation.navigate('Home');
    };

    const openGalery = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [8, 8],
                quality: 1,
            });

            if (!result.canceled && result.assets.length > 0) {
                setProducto({
                    ...producto,
                    imagen: result.assets[0].uri
                });
            }
        } catch (error) {
            console.error('Error al abrir la galería', error);
        }
    };

    const agregarProducto = async () => {
        setLoading(true);
        try {
            let imageUrl = null;

            if (producto.imagen) {
                const imageRef = ref(storage, `images/${Date.now()}-${producto.nombre}`);
                const response = await fetch(producto.imagen);
                const blob = await response.blob();
                const snapshot = await uploadBytes(imageRef, blob);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            await addDoc(collection(database, 'productos'), { ...producto, imagen: imageUrl });
            Alert.alert('Producto agregado', 'El producto se agregó correctamente', [
                { text: 'Ok', onPress: goToHome },
            ]);

            goToHome();
        } catch (error) {
            console.error('Error al agregar el producto', error);
            Alert.alert('Error', 'Ocurrió un error al agregar el producto. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar producto</Text>
            <InputComponent
                label="Nombre"
                value={producto.nombre}
                onChangeText={text => setProducto({ ...producto, nombre: text })}
                placeholder="Nombre del producto"
            />
            <InputComponent
                label="Precio"
                value={producto.precio.toString()}
                onChangeText={text => setProducto({ ...producto, precio: parseFloat(text) })}
                placeholder="Precio"
                keyboardType="numeric"
            />
            <ButtonComponent title="Seleccionar Imagen" onPress={openGalery} />
            {producto.imagen ? <Image source={{ uri: producto.imagen }} style={styles.image} /> : null}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ButtonComponent title="Agregar Producto" onPress={agregarProducto} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginVertical: 20,
    },
});

export default AgregarProducto;
