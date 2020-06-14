import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import Buttons from '../constants/Buttons';
import functions from '../functions/functions';
import OutputsResponses from '../constants/OutputsResponses';
import FlatListStyles from '../constants/FlatListStyles';
import NavButtons from '../constants/NavButtons';
import Texts from '../constants/Texts';
import Separator from './Separator';
import ContainerT from './ContainerT';
import MyPicker from './MyPicker';
//import Disclaimer from './Disclaimer';

export default function Tranche({ navigation }) {
    const [startPickerIsVisible, setStartPickerIsVisible] = useState(true);
    const [endPickerIsVisible, setEndPickerIsVisible] = useState(false);
    const [initDate, setInitDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [orderedTasks, setOrderdTasks] = useState([]);
    const [noResultsToShow, setNoResultsToShow] = useState('');
    const [dataIsLoading, setDataIsLoading] = useState(false);
    const [y, sety] = useState();
    const [m, setm] = useState();
    const [d, setd] = useState();

    const pressHome = () => {
        navigation.navigate('Home');
    }

    const searchByDates = () => {
        setDataIsLoading(true); //  is loading 
        functions.getByDates(initDate, endDate, callback);
    }

    const callback = (data) => {
        setOrderdTasks([...data]);
        setDataIsLoading(false); //finished loading
        typeof (data) === 'string' ? setNoResultsToShow(true) : setNoResultsToShow(false);
    }

    const activateStartPicker = () => {
        setStartPickerIsVisible(true);
        setEndPickerIsVisible(false);
    }

    const hidePicker = () => {
        setStartPickerIsVisible(false);
    }

    const hideSecondPicker = () => {
        setEndPickerIsVisible(false)
    }

    const activateEndPicker = () => {
        setStartPickerIsVisible(false);
        setEndPickerIsVisible(true)
    }

    const callbackFunction = (dd, mm, yy) => {
        sety(yy);
        setm(mm);
        setd(dd);
        // console.log(dd, mm, yy);     
        setInitDate(dd + '/' + mm + '/' + yy);
        console.log(initDate);
    }

    const secndCallback = (dd, mm, yy) => {
        sety(yy);
        setm(mm);
        setd(dd);
        //  console.log(dd, mm, yy);
        setEndDate(dd + '/' + mm + '/' + yy)
        console.log(endDate);
    }

    return (
        <View style={styles.outerContainer}>
            <ContainerT>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={Buttons.halfSend}
                        onPress={activateStartPicker}>
                        <Text style={Buttons.buttonText}>Definir início</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={Buttons.halfSend}
                        onPress={activateEndPicker}>
                        <Text style={Buttons.buttonText}>Definir fim</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.miniButtons}>
                    {startPickerIsVisible ?
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, marginTop: 5 }}>Selecione data de início:</Text>
                            <MyPicker parentCallback={callbackFunction} />
                        </View>
                        :
                        null
                    }

                    {endPickerIsVisible ?
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, marginTop: 5 }}>Selecione data de fim:</Text>
                            <MyPicker parentCallback={secndCallback} />
                        </View>
                        :
                        null
                    }

                </View>

                <View style={styles.afterButtons}>

                    {
                        (initDate.length === 0 || initDate.includes('Dia') ||
                            initDate.includes('Mês') || initDate.includes('Ano'))
                            ?
                            <View style={{ backgroundColor: 'transparent', height: 20 }}>
                                <Text style={styles.internalText}>Nenhuma data inicial selecionada.</Text>
                            </View>
                            :
                            <View style={{ backgroundColor: 'transparent', height: 20 }}>
                                <Text style={styles.internalText}>Data de início: {initDate}</Text>
                            </View>
                    }
                    {
                        (endDate.length === 0 || endDate.includes('Dia') ||
                            endDate.includes('Mês') ||
                            endDate.includes('Ano')
                        ) ?
                            <View style={{ backgroundColor: 'transparent', height: 20 }}>
                                <Text style={styles.internalText}>Nenhuma data final selecionada.</Text>
                            </View>
                            :
                            <View style={{ backgroundColor: 'transparent', height: 20 }}>
                                <Text style={styles.internalText}>Data de fim: {endDate}</Text>
                            </View>

                    }

                </View>

                <View style={Buttons.buttonsContainer}>
                    <TouchableOpacity
                        style={Buttons.send}
                        onPress={searchByDates}>
                        <Text style={Buttons.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 100, backgroundColor: 'transparent' }}>
                    {dataIsLoading ?
                        <View style={styles.pleaseWait}>
                            <Text style={Texts.pleaseWait}>Por favor aguarde...</Text>
                        </View>
                        :
                        !noResultsToShow ?
                            <View style={FlatListStyles.flatList}>
                                <FlatList
                                    keyExtractor={(item => item._id)}
                                    data={orderedTasks}
                                    renderItem={item => (
                                        <View style={styles.output} >
                                            <Text style={Texts.outputText}>
                                                <Text style={Texts.label}>Compromisso:</Text>{"\n"}
                                                {item.item['Registo']}{"\n"}
                                                <Text style={Texts.label}>Data:</Text>{"\n"}
                                                {item.item['Data']}{"\n"}
                                                <Text style={Texts.label}>Hora:</Text>{"\n"}
                                                {item.item['Hora']} {"\n"}
                                            </Text>
                                            <Separator />
                                        </View>
                                    )}>
                                </FlatList>
                            </View>
                            :
                            <View style={FlatListStyles.noResponse}>
                                <FlatList
                                    keyExtractor={(item => Math.floor(Math.random() * 10000000).toString())}
                                    data={orderedTasks[0]}
                                    renderItem={item => (
                                        <View style={styles.noResponse}>
                                            <Text style={OutputsResponses.noResults}>
                                                {orderedTasks}
                                            </Text>
                                        </View>
                                    )}>
                                </FlatList>
                            </View>
                    }
                </View>

            </ContainerT>

            <View style={NavButtons.buttonsContainer}>
                <TouchableOpacity
                    style={NavButtons.navigationButton}
                    onPress={pressHome}>
                    <Text style={NavButtons.buttonText}>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    //nothing happening here   :)
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    afterButtons: {
        // marginTop: 40, //ios é 40
        //  height: 40, //ios é 40
        backgroundColor: 'white',
        marginTop: Platform.OS === 'ios' ? 40 : 40,
        height: Platform.OS === 'ios' ? 40 : 60,
        marginBottom: Platform.OS === 'ios' ? null : 20,
    },
    miniButtons: {
        // height: 200,
        backgroundColor: 'transparent',
        height: Platform.OS === 'ios' ? 200 : 80
    },
    dateInfo: {
        // marginTop: 5,
        // marginBottom: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'white'
    },
    internalText: {
        lineHeight: Platform.OS === 'ios' ? null : 50,
        fontSize: Platform.OS === 'ios' ? null : 15,
    },
    pleaseWait: {
        height: 80,
        backgroundColor: 'white',
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResponse: {
        height: 100,
        backgroundColor: 'white',
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',

    }
});
