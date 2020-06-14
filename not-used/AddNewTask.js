import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import Datepicker from '../components/Datepicker';

export default function AddNewTask({ navigation }) {
    const [enteredInput, setEnteredInput] = useState('');
    const [output, setOutput] = useState('');

    const pressHome = () => {
        // navigation.goBack();
        navigation.navigate('Home');
    }
    const pressList = () => {
        navigation.navigate('List');
    }

    const getInput = (input) => {
        setEnteredInput(input);
        console.log(enteredInput, ' apanhar o input corretamente!');
    }
    const obj = {
        'Registo': enteredInput,
        'Data': 'nop',
        'Hora': 'ver como capto a HORA selecionada pelo user',
    }

    const submitCompromisso = (event) => {
        //   console.log(obj, 'obj aqui');
        event.preventDefault();
        //  console.log(enteredInput, ' dentro do api call');
        axios.post('https://agenda2020.glitch.me/api/agenda/novo', obj)
            .then(response => {
                // console.log(response.data, ' response.data aqui');
                setOutput(output => response.data);
            })
            .catch(error => { console.log(error) });
    }


    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput style={styles.textInput}
                        onChangeText={getInput}
                        value={enteredInput}
                    />
                    <Datepicker />
                </View>
                <TouchableOpacity
                    style={styles.secondButton}
                    onPress={submitCompromisso}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>

                <View style={styles.display}>
                    <Text>{output} </Text>
                </View>
            </View>


            <Button title="Back Home" onPress={pressHome} />
            <Button title="NewsFlash" onPress={pressList} />
        </View>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'lightgreen'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        width: 200,
        height: 40,
        lineHeight: 20,
        marginTop: 2,
        marginBottom: 2

    },
    form: {
        flexDirection: 'column',
        //  height: '60%',

    },
    secondButton: {
        marginLeft: 5,
        width: 80,
        backgroundColor: 'red',
        height: 50,
        borderRadius: 20,
        alignItems: "center",
        padding: 15
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        justifyContent: 'center',

    },
    datepicker: {
        borderWidth: 1,
        borderColor: 'black',
        width: 200,
        marginTop: 2,
        marginBottom: 2,
        height: 40,
        lineHeight: 20,

    },
    display: {
        width: 200,
        height: 80,
        backgroundColor: 'lightgrey'
    }

});


