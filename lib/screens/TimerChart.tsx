import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomMenuBar} from './BottomMenuBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMER_STORAGE_KEY = '@totalSeconds';
const TARGET_DATE = '20231227';

export function TimerChart() {
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    loadTotalSeconds();
  }, []);

  const loadTotalSeconds = async () => {
    try {
      const storedTotalSeconds = await AsyncStorage.getItem(TIMER_STORAGE_KEY);
      const parsedTotalSeconds = storedTotalSeconds
        ? JSON.parse(storedTotalSeconds)
        : {};
      setTotalTime(parsedTotalSeconds[TARGET_DATE]?.seconds || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const formattedTime = () => {
    const minutes = Math.floor(totalTime / 60);
    const remainingSeconds = totalTime % 60;

    return `${String(minutes).padStart(2, '0')}분 ${String(
      remainingSeconds,
    ).padStart(2, '0')}초`;
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.txtContainer}>
        <Text style={styles.testTxt}>{formattedTime()}</Text>
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
