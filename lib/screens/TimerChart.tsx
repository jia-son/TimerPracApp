import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomMenuBar} from './BottomMenuBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMER_STORAGE_KEY = '@totalSeconds';

export function TimerChart() {
  const [totalTime, setTotalTime] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState<{
    [key: string]: {seconds: number};
  }>({});

  const loadTotalSeconds = async () => {
    try {
      const storeTimeGet = await AsyncStorage.getItem(TIMER_STORAGE_KEY);
      //   const parsedTotalSeconds = JSON.parse(storeTimeGet ?? '{}');
      //   setTotalSeconds(parsedTotalSeconds);
      //   setTotalTime(parsedTotalSeconds['20231227']?.seconds || 0);
      //   console.log('저장된 시간:', parsedTotalSeconds);

      if (storeTimeGet?.length === 0) {
        setTotalSeconds({});
        setTotalTime(0);
      } else {
        setTotalSeconds(JSON.parse(storeTimeGet!));
        setTotalTime(0);
        console.log('우리 좋았잖아:', totalSeconds);
        console.log('아니야?:', totalTime);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const formattedTime = () => {
    const minutes = Math.floor(totalTime / 60);
    const remainingSeconds = totalTime % 60;

    if (minutes > 59) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      return `${String(hour).padStart(2, '0')}시간 ${String(minute).padStart(
        2,
        '0',
      )}분 ${String(remainingSeconds).padStart(2, '0')}초`;
    } else {
      return `${String(minutes).padStart(2, '0')}분 ${String(
        remainingSeconds,
      ).padStart(2, '0')}초`;
    }
  };

  useEffect(() => {
    loadTotalSeconds();
  }, []);

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
