import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, FlatList } from 'react-native';
import ScreenStyles from '../constants/ScreenStyles';
import Buttons from '../constants/Buttons';
import Container from '../constants/Container';
import DatePicker from 'react-native-datepicker';
import DatepickerStyles from '../constants/DatepickerStyles';
import FlatListStyles from '../constants/FlatListStyles';
import functions from '../functions/functions';

export default function TestParcial({ navigation }) {
    const [initDate, setInitDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [orderedTasks, setOrderdTasks] = useState([]);
    const [noResultsToShow, setNoResultsToShow] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const pressHome = () => {
        navigation.navigate('Home');
    }

    const searchByDates = () => {
        setIsLoading(true);
        functions.getByDates(initDate, endDate, callback);
    }

    const callback = (data) => {
        setOrderdTasks([...data]);
        setIsLoading(false);
        typeof (data) === 'string' ? setNoResultsToShow(true) : setNoResultsToShow(false);
    }

    return (
        <View style={ScreenStyles.screen}>
            <View style={Container.container}>
                <DatePicker
                    style={DatepickerStyles.datepicker}
                    date={initDate}
                    mode="date"
                    placeholder="Selecionar data"
                    format="DD-MM-YYYY"
                    minDate={initDate}
                    maxDate="31-12-2099"
                    confirmBtnText="OK"
                    cancelBtnText="Cancelar"
                    customStyles={
                        {
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,

                            }

                        }
                    }
                    onDateChange={(initDate) => setInitDate(initDate)}
                />
                <DatePicker
                    style={DatepickerStyles.datepicker}
                    date={endDate}
                    mode="date"
                    placeholder="Selecionar data"
                    format="DD-MM-YYYY"
                    minDate={endDate}
                    maxDate="31-12-2099"
                    confirmBtnText="OK"
                    cancelBtnText="Cancelar"
                    customStyles={
                        {
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,

                            }

                        }
                    }
                    onDateChange={(endDate) => setEndDate(endDate)}
                />
                <View style={Buttons.buttonsContainer}>
                    <TouchableOpacity
                        style={Buttons.firstButton}
                        onPress={searchByDates}>
                        <Text style={Buttons.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    {isLoading ?
                        <View style={FlatListStyles.flatList}>
                            <Text>Por favor, aguarde</Text>
                        </View>
                        :
                        !noResultsToShow ?
                            <View style={FlatListStyles.flatList}>
                                <FlatList style={FlatListStyles.flatList}
                                    keyExtractor={(item => item._id)}
                                    data={orderedTasks}
                                    renderItem={item => (
                                        <View style={styles.output} >
                                            <Text >
                                                ID: {item.item['_id']} {"\n"}
                                    Compromisso: {item.item['Registo']}{"\n"}
                                    Data: {item.item['Data']}{"\n"}
                                    Hora: {item.item['Hora']} {"\n"}
                                            </Text>
                                        </View>
                                    )}>
                                </FlatList>
                            </View>
                            :
                            <View style={FlatListStyles.flatList}>
                                <FlatList style={FlatListStyles.flatList}
                                    keyExtractor={(item => Math.floor(Math.random() * 10000000).toString())}
                                    data={orderedTasks[0]}
                                    renderItem={item => (
                                        <View style={styles.output}>
                                            <Text style={styles.noResults}>
                                                {orderedTasks}
                                            </Text>
                                        </View>
                                    )}>
                                </FlatList>
                            </View>}
                </View>
            </View>

            <Button title="Back Home" onPress={pressHome} />
        </View>
    )
}

const styles = StyleSheet.create({
    noResults: {
        textAlign: "center",
    },
});


