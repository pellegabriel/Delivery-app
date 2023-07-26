import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Separator() {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.separatorLine} />
      <Text style={styles.separatorText}>o</Text>
      <View style={styles.separatorLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  separatorContainer: {
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  separatorText: {
    width: 20,
    textAlign: 'center',
    color: 'white',
  },
});
