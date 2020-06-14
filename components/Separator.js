import React from 'react';
import { StyleSheet, View } from 'react-native';

const Separator = () => {
  return <View style={styles.separator} />
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 4,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

});
export default Separator;

