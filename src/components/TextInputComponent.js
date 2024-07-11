import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const TextInputComponent = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType, maxLength }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            maxLength={maxLength}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
        marginBottom: 20,
    },
});

export default TextInputComponent;
