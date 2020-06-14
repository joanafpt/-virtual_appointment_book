import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Buttons from '../constants/Buttons';
import EntryClock from './EntryClock';
import ChangeData from './ChangeData';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
    return Font.loadAsync({
        lobster: require('../assets/fonts/Lobster-Regular.ttf'),
    });
};
export default function Home({ navigation }) {
    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    const onPressButtonAddNewTask = () => {
        navigation.navigate('SecondAddNewTask');
    }

    const onPressButtonGoToTaskList = () => {
        navigation.navigate('List');
    }

    const onPressButtonGoToComplete = () => {
        navigation.navigate('ApiResults')
    }

    const onPressGoToPartialDates = () => {
        navigation.navigate('Tranche');
    }


    if (!dataIsLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataIsLoaded(true)}
            />
        );
    }

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <ChangeData />
                <EntryClock />
            </View>    
            <View style={styles.buttonsContainer}>
                <View style={{ marginBottom: 5 }}>
                    <TouchableOpacity
                        style={styles.introButtons}
                        onPress={onPressButtonAddNewTask}>
                        <Text style={styles.introButtonText}>NOVO</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 5 }}>
                    <TouchableOpacity
                        style={styles.introButtons}
                        onPress={onPressButtonGoToTaskList}>
                        <Text style={styles.introButtonText}>DIÁRIO</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 5 }}>
                    <TouchableOpacity
                        style={styles.introButtons}
                        onPress={onPressGoToPartialDates}>
                        <Text style={styles.introButtonText}>PARCIAL</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 5 }}>
                    <TouchableOpacity
                        style={styles.introButtons}
                        onPress={onPressButtonGoToComplete}>
                        <Text style={styles.introButtonText}>TODOS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '15%',
    }, 
    introButtons:{
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'tomato',
        borderWidth: 1
    },
    introButtonText:{
        textAlign: 'center',
        paddingTop: 40,
        fontWeight: 'bold',
        color: 'tomato'        
    }
});

