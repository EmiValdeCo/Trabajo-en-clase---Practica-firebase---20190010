import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DatePickerComponent = ({ value, onChangeText }) => {
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date(value);
        setShow(false);
        const formattedDate = moment(currentDate).format('DD/MM/YYYY');
        onChangeText(formattedDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View>
            <TouchableOpacity style={styles.input} onPress={showDatepicker}>
                <Text style={styles.inputText}>{value || 'Fecha de nacimiento (DD/MM/AAAA)'}</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
                />
            )}
        </View>
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
        justifyContent: 'center',
    },
    inputText: {
        color: '#000',
    },
});

export default DatePickerComponent;
