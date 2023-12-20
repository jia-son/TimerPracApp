import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.timer}>
        <Text style={styles.text}>홈 스크린</Text>
      </View>
      <View style={styles.menuBar}>
        <Text style={styles.menuItem}>타이머</Text>
        <Text style={styles.menuItem}>시각화</Text>
        <Text style={styles.menuItem}>투두</Text>
        <Text style={styles.menuItem}>마이페이지</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
  },
  timer: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menuItem: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
});
