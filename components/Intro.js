import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Circle from '../components/Circle';

const fetchFonts = () => {
  return Font.loadAsync({
    lobster: require('../assets/fonts/Lobster-Regular.ttf'),
  });
};

//uniformizar para ES6 no resto do código
const Intro = ({ navigation }) => {

  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => { navigation.navigate('Home') }, 3000);
  });

  if (!dataIsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataIsLoaded(true)}
      />
    );
  }
  return (
    <View style={styles.intro}>
      <Circle />
    </View>
  )
}

const styles = StyleSheet.create({
  intro: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
  }
})
export default Intro;