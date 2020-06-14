import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard , Platform} from 'react-native';
import ScreenStyles from '../constants/ScreenStyles';
import Buttons from '../constants/Buttons';
import Clock from '../constants/Clock';
import OutputsResponses from '../constants/OutputsResponses';
import TextInputStyles from '../constants/TextInputStyles';
import NavButtons from '../constants/NavButtons';
import Form from '../constants/Form';
import functions from '../functions/functions';
import { Ionicons } from '@expo/vector-icons';
import ContainerT from './ContainerT';
import MyPicker from './MyPicker'

export default function SecondAddNewTask({ navigation }) {
    const [enteredInput, setEnteredInput] = useState('');
    const [output, setOutput] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [y, sety] = useState();
    const [m, setm] = useState();
    const [d, setd] = useState();

    const pressHome = () => {
        navigation.navigate('Home');
    }

    const pressList = () => {
        navigation.navigate('List');
    }

    const getInput = (input) => {
        setEnteredInput(input);
        // console.log(enteredInput);
    }

    const getHours = (enteredHours) => {
        setHours(enteredHours);
        // console.log(hours);
    }

    const getMinutes = (enteredMinutes) => {
        setMinutes(enteredMinutes);
        // console.log(minutes);
    }

    const obj = {
        'Registo': enteredInput,
        //'Data': date,
        'Data': d + '/' + m + '/' + y,
        // 'Hora': time,
        'Hora': hours.toString().concat(':').concat(minutes.toString()),
    }

    const postDataIntoAgenda = () => {
        setIsPosting(true);
        functions.submitCompromisso(obj, callback);
    }

    const callback = (data) => {
        //console.log(data, 'data');
        setOutput(output => [...data]);
        setIsPosting(false);
    }

    const callbackFunction = (dd, mm, yy) => {
        sety(yy);
        setm(mm);
        setd(dd);
        setOutput('');
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} >
            <View style={ScreenStyles.screen}>
                <ContainerT>
                    <View style={Form.form}>
                        <TextInput style={TextInputStyles.textInput}
                            onChangeText={getInput}
                            value={enteredInput}
                            placeholder="Compromisso" />
                        <View style={Clock.clockContainer}>
                            <View style={styles.innerClockContainer}>
                                <Text>
                                    <Ionicons name="md-clock" size={32} color="black" />
                                </Text>
                            </View>
                            <TextInput style={Clock.clockInput}
                                onChangeText={getHours}
                                keyboardType="number-pad"
                                value={hours}
                                placeholder="hh"
                                maxLength={2} />
                            <View style={Clock.twoPoints}>
                                <Text style={Clock.text}>:</Text>
                            </View>
                            <TextInput style={Clock.clockInput}
                                onChangeText={getMinutes}
                                keyboardType="number-pad"
                                value={minutes}
                                placeholder="mm"
                                maxLength={2} />
                        </View>
                    </View>

                    <View style={styles.picker}>
                        <MyPicker parentCallback={callbackFunction} />
                   
                        {
                            ((d === 'Dia' || m === 'Mês' || y === 'Ano') ||
                                typeof (d) === 'undefined' &&
                                typeof (m) === 'undefined' &&
                                typeof (y) === 'undefined')
                                ?
                                <View style={styles.dateInfo}>
                                    <Text>Nenhuma data selecionada.</Text>
                                </View>
                                :
                                <View style={styles.dateInfo}>
                                    <Text>A data selecionada é {d}/{m}/{y}</Text>
                                </View>
                        }
                    </View> 

                    <View style={Buttons.buttonsContainer}>
                        <TouchableOpacity
                            style={Buttons.send}
                            onPress={postDataIntoAgenda}>
                            <Text style={Buttons.buttonText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={OutputsResponses.display}>
                        {
                            isPosting ?
                                <View style={styles.informativeView}>
                                    <Text style={styles.informativeText}>Por favor aguarde...</Text>
                                </View>
                                :
                                <View style={styles.informativeView}>
                                    <Text style={styles.informativeText}>{output}</Text>
                                </View>
                        }
                    </View>
                </ContainerT>
                
                <View style={NavButtons.buttonsContainer}>
                    <View style={NavButtons.container}>
                        <TouchableOpacity
                            style={NavButtons.navigationButton}
                            onPress={pressHome}>
                            <Text style={NavButtons.buttonText}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={NavButtons.navigationButton}
                            onPress={pressList}>
                            <Text style={NavButtons.buttonText}>Lista</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({

    picker: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
       
        
    },
    enviar: {
        width: 230,
        backgroundColor: 'tomato',
        height: 28,
        alignItems: "center",
        padding: 5
    },
    dateInfo: {
       // marginTop: 5,
       // marginBottom: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor:'white'
    },
    innerClockContainer: {
        marginTop: 5,
        marginRight: 5
    },
    informativeView: {
        backgroundColor: 'white',
        height: 60,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',

    },
    informativeText: {
        textAlign: 'center',
        //fontSize: 15,
       
    }

});

