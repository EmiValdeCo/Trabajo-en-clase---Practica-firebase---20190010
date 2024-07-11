import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { database } from '../config/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import CardProductos from '../components/CardProductos';
import { Ionicons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const q = query(collection(database, 'productos'), orderBy('creado', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProductos(docs);
        });

        return () => unsubscribe();
    }, []);

    const goToAdd = () => {
        navigation.navigate('Add');
    };

    const goToSettings = () => {
        navigation.navigate('Settings');
    };

    const renderItem = ({ item }) => (
        <CardProductos
            id={item.id}
            nombre={item.nombre}
            precio={item.precio}
            vendido={item.vendido}
            imagen={item.imagen}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Productos Disponibles</Text>
                <TouchableOpacity onPress={goToSettings}>
                    <Ionicons name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {productos.length !== 0 ? (
                <FlatList
                    data={productos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <Text style={styles.Subtitle}>No hay productos disponibles</Text>
            )}
            <TouchableOpacity
                style={styles.Button}
                onPress={goToAdd}>
                <Text style={styles.ButtonText}>Agregar Producto</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    Subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#ff9800',
    },
    Button: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal: 50,
        paddingVertical: 20,
    },
    ButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    list: {
        flexGrow: 1,
    },
});

export default Home;
