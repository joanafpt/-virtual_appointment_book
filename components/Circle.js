import React from 'react';
import { View, Text } from 'react-native';

const Circle = () => {

    return (
        <View style={styles.yellowView}>
            <View style={styles.lightYellowView}>
                <View style={styles.centerView}>
                    <Text style={styles.labelPresentation}>A minha</Text>
                    <Text style={styles.labelPresentation}>Agenda</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    yellowView: {
        width: 300, 
        height: 300, 
        backgroundColor: '#F5BB00',
        borderRadius: 150, 
        flexDirection: 'column',
        justifyContent: 'center',
    },
    lightYellowView:{
        width: 290, 
        height: 290, 
        backgroundColor: '#F9E79F',
        borderRadius: 145, 
        flexDirection: 'column',
        justifyContent: 'center',
    },
    centerView:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelPresentation:{ 
        fontFamily: 'lobster', 
        fontSize: 55, 
        color: 'black'
     }
  
    
});

export default Circle;
