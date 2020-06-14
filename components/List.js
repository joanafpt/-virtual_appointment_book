import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import ScreenStyles from '../constants/ScreenStyles';
import Buttons from '../constants/Buttons';
import FlatListStyles from '../constants/FlatListStyles';
import OutputsResponses from '../constants/OutputsResponses';
import NavButtons from '../constants/NavButtons';
import Texts from '../constants/Texts';
import Separator from './Separator';
import ContainerT from './ContainerT';
import functions from '../functions/functions';
import MyPicker from './MyPicker';

export default function List({ navigation }, props) {
    const [dateToSearch, setDateToSearch] = useState('');
    const [responseFromDB, setResponseFromDB] = useState('');
    const [responseIsString, setResponseIsString] = useState(false);
    const [dataIsLoading, setDataIsLoading] = useState(false);
    const [y, sety] = useState();
    const [m, setm] = useState();
    const [d, setd] = useState();

    const pressAbout = () => {
        navigation.navigate('SecondAddNewTask');
    }
    const pressHome = () => {
        navigation.navigate('Home');
    }

    const callback = (data) => {
        (dateToSearch) => setDateToSearch(data)
        setResponseFromDB(responseFromDB => data)
        setDataIsLoading(false);
        typeof (data) === 'string' ? setResponseIsString(true) : setResponseIsString(false)
    }

    const getTaskByProvidedDate = () => {
        setDataIsLoading(true);
        //console.log(d, m, y, ' d, m y');
        //console.log(d + '/' + m + '/' + y, ' d + / + m + / + y');
        let strToSend = d + '/' + m + '/' + y;
        functions.searchCompromissoByDate(strToSend, callback);
    }

    const callbackFunction = (dd, mm, yy) => {
        sety(yy);
        setm(mm);
        setd(dd);
    }

    return (
        <View style={ScreenStyles.screen}>
            <ContainerT>
                <MyPicker parentCallback={callbackFunction} />
                {((d === 'Dia' || m === 'Mês' || y === 'Ano') ||
                    typeof (d) === 'undefined' && typeof (m) === 'undefined' && typeof (y) === 'undefined') ?
                    <View style={styles.dateInfo}>
                        <Text>Nenhuma data selecionada.</Text>
                    </View>
                    :
                    <View style={styles.dateInfo}>
                        <Text>A data selecionada é {d}/{m}/{y}</Text>
                    </View>

                }
                <View /*style={Buttons.buttonsContainer}*/>
                    <TouchableOpacity
                        style={Buttons.singleButton}
                        onPress={getTaskByProvidedDate}>
                        <Text style={Buttons.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
                <View  style={FlatListStyles.listOutput}>
                    {dataIsLoading ?
                        <View style={styles.pleaseWaitView}>
                            <Text style={styles.pleaseWait}>Por favor aguarde...</Text>
                        </View>
                        :
                        !responseIsString ?
                            <View style={FlatListStyles.flatList}>
                                <FlatList
                                    keyExtractor={(item, index) => Math.random().toString()}
                                    data={responseFromDB}
                                    renderItem={item => (
                                        <View style={styles.comprFrame}>
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
                                    data={responseFromDB[0]}
                                    renderItem={item => (
                                        <View style={FlatListStyles.noResponse}>
                                            <Text style={OutputsResponses.noResults}>
                                                {responseFromDB}
                                            </Text>
                                        </View>
                                    )}>
                                </FlatList>
                            </View>
                    }
                </View>
            </ContainerT>

            <View style={NavButtons.buttonsContainer}>
                <View style={NavButtons.leftButton}>
                    <TouchableOpacity
                        style={NavButtons.navigationButton}
                        onPress={pressHome}>
                        <Text style={NavButtons.buttonText}>Home</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={NavButtons.navigationButton}
                    onPress={pressAbout}>
                    <Text style={NavButtons.buttonText}>Novo</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pleaseWait: {
        textAlign: 'center',
        
    },
    dateInfo: {
        height: 35, backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'center'
    },
    comprFrame: {
        marginTop: 4
    },
    pleaseWaitView:{
        height: 100,
        backgroundColor: 'white',
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
    }
    
});
