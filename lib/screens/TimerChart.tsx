import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomMenuBar} from './BottomMenuBar';

export function TimerChart() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.txtContainer}>
        <Text style={styles.testTxt}>시각화 페이지</Text>
      </View>
      <BottomMenuBar />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#252321',
    paddingHorizontal: 20,
  },
  txtContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testTxt: {
    color: 'white',
    fontSize: 30,
  },
});
