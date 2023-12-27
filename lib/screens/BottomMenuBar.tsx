import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

export function BottomMenuBar() {
  const navigation = useNavigation();
  const route = useRoute();

  const nowRouteName = route.name;

  const handleTimerPress = () => {
    if (nowRouteName !== 'Home') {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  };

  const handleToDoPress = () => {
    if (nowRouteName !== 'Todo') {
      navigation.reset({
        index: 0,
        routes: [{name: 'Todo'}],
      });
    }
  };

  return (
    <View style={styles.menuBar}>
      {nowRouteName === 'Home' ? (
        <Text style={[styles.menuItem, styles.disabledText]}>타이머</Text>
      ) : (
        <TouchableOpacity onPress={handleTimerPress}>
          <Text style={styles.menuItem}>타이머</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.menuItem}>시각화</Text>
      {nowRouteName === 'Todo' ? (
        <Text style={[styles.menuItem, styles.disabledText]}>투두</Text>
      ) : (
        <TouchableOpacity onPress={handleToDoPress}>
          <Text style={styles.menuItem}>투두</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.menuItem}>마이페이지</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  disabledText: {
    color: 'gray',
  },
});
