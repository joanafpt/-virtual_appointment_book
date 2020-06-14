import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import ScreenStyles from '../constants/ScreenStyles';
import FlatListStyles from '../constants/FlatListStyles';
import Buttons from '../constants/Buttons';
import functions from '../functions/functions';
import NavButtons from '../constants/NavButtons';
import Texts from '../constants/Texts';
import ContainerT from './ContainerT';
import Separator from './Separator';

export default function ApiResults({ navigation }) {
    const [dataToRender, setDataToRender] = useState([]);
    const [dataIsLoading, setDataIsLoading] = useState(false);

    const goBack = () => {
        navigation.navigate('Home');
    }

    useEffect(() => {
        setDataIsLoading(true);
        functions.getCompleteDataFromApi(cbFunction);

    }, []);//I shall say this only once

    const cbFunction = (data) => {
        setDataToRender(dataToRender => [...data]);
        setDataIsLoading(false);
    }

    return (
        <View style={ScreenStyles.screen}>
            <ContainerT>
                {dataIsLoading ?
                    <View style={FlatListStyles.pleaseWaitAllResults}>
                        <Text style={Texts.pleaseWaitAllResults}>Por favor, aguarde...</Text>
                    </View>
                    :
                    <View style={{
                        height: dataToRender.length < 5 ? 240 : 380,
                        backgroundColor: 'white',
                        width: 250
                    }}>
                        <FlatList
                            keyExtractor={(item => item._id)}
                            data={dataToRender}
                            renderItem={item => (
                                <View style={{ justifyContent: 'center', textAlign: 'center' }}>
                                    <Text style={Texts.outputTextAll}>
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
                }
            </ContainerT>

            <View style={NavButtons.buttonsContainer}>
                <View style={NavButtons.buttonsContainer}>
                    <TouchableOpacity
                        style={NavButtons.navigationButton}
                        onPress={goBack}>
                        <Text style={NavButtons.buttonText}>Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    //nothing happening here 

});

