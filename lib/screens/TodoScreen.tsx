import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export function TodoScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.timer}>
        <Text style={styles.text}>투두리스트</Text>
      </View>
      <View style={styles.btnContainer} />
      <View style={styles.menuBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          }}>
          <Text style={styles.menuItem}>타이머</Text>
        </TouchableOpacity>
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
    backgroundColor: '#252321',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
  },
  timer: {
    flex: 7,
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
  btnContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 100,
  },
  pickerStyle: {
    marginTop: 50,
  },
});
