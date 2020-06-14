import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function ChangeData() {
    const [increment, setIncrement] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(
            () => setIncrement(
                //new Date().toLocaleString()), 1000);
                new Date().toLocaleDateString('pt-PT')), 1000);
                
        return () => {
            clearInterval(interval);          
        };
    });

    return (
        <View style={styles.dateStyle}>
            <View>
                 <Text style={styles.dateStyleText}>
                    {increment.toLocaleString().substr(0, 10)}
                </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    dateStyle: {
        backgroundColor: 'white',
        height: 25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateStyleText: {
        color: 'tomato',
        fontSize: 20
    },
});




