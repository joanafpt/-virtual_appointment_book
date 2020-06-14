import React from 'react';
import { View, StyleSheet } from 'react-native';

const ContainerT = props => {
    return (
        <View style={{ ...styles.container, ...props.style }}>{props.children}</View>
    )
}

const styles = StyleSheet.create({
    //shared styles
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

});

export default ContainerT;