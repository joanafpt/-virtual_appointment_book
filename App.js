import React, {useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import Navigator from './routes/HomeStack';

export default function App() {

 



  return (
    <View style={styles.screen}>
      <Navigator />

  
    
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 24,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
