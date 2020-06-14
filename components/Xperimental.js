import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyPicker from './MyPicker';


const Xperimental = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <MyPicker />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
export default Xperimental;