import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function EntryClock({ navigation }) {
  const [clockTime, setClockTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setClockTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  // adding zero in front of numbers < 10:
  const formatTime = (value) => {
    if (value < 10) {
       value = "0" + value 
    };  
    return value;
  }

  return (
    <View style={styles.clock}>
      <Text style={styles.clockText}>
          {formatTime(clockTime.getHours())}:
          {formatTime(clockTime.getMinutes())}:
          {formatTime(clockTime.getSeconds())}
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  clock: {
    backgroundColor: 'white',
    height: 25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockText: {
    color: 'tomato',
    fontSize: 20
  },
});




