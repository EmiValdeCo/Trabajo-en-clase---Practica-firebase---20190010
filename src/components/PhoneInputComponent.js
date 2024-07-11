import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const PhoneInputComponent = ({ placeholder, value, onChangeText }) => {
    const handlePhoneChange = text => {
        const formatted = text.replace(/[^0-9-]/g, '').replace(/(\d{4})(\d)/, '$1-$2');
        onChangeText(formatted);
    };

    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            maxLength={9}
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

export default PhoneInputComponent;
