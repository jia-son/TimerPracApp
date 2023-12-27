import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';
import WheelPicker from '../component/WheelPicker';
import {BottomMenuBar} from './BottomMenuBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMER_STORAGE_KEY = '@totalSeconds';

export function HomeScreen() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [initailTime, setInitilaTime] = useState(0);

  const [totalSeconds, setTotalSeconds] = useState<{
    [key: string]: {seconds: number};
  }>({});

  useEffect(() => {
    var interval: any;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds !== 0) {
          setSeconds(prevSeconds => prevSeconds - 1);
        } else {
          saveToTalSeconds(initailTime);
          handleReset();
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const saveToTalSeconds = async (toSecond: number) => {
    try {
      const storeTimeGet = await AsyncStorage.getItem(TIMER_STORAGE_KEY);
      if (storeTimeGet!.length === 0) {
        setTotalSeconds({['20231227']: {seconds: toSecond}});
      } else {
        const json = JSON.parse(storeTimeGet ?? '[]');
        const newSconds = toSecond + json['20231227'].seconds;
        setTotalSeconds({['20231227']: {seconds: newSconds}});
      }

      await AsyncStorage.setItem(
        TIMER_STORAGE_KEY,
        JSON.stringify(totalSeconds),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const formattedTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 59) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      return `${String(hour).padStart(2, '0')}:${String(minute).padStart(
        2,
        '0',
      )}:${String(remainingSeconds).padStart(2, '0')}`;
    } else {
      return `${String(minutes).padStart(2, '0')}:${String(
        remainingSeconds,
      ).padStart(2, '0')}`;
    }
  };

  const timeSetting = (time: number) => {
    setSeconds(time);
    setInitilaTime(time);
  };

  const handleIsActive = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    timeSetting(initailTime);
    setIsActive(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.timer}>
        <Text style={styles.text}>{formattedTime()}</Text>
        <View style={{...styles.pickerStyle, height: 20 * 3}}>
          <WheelPicker
            itemHeight={40}
            items={['기본 시간', '1시간', '1시간 30분', '테스트 1분']}
            onItemChange={item => {
              if (item === '기본 시간') {
                timeSetting(2700);
              } else if (item === '1시간') {
                timeSetting(3600);
              } else if (item === '테스트 1분') {
                timeSetting(60);
              } else {
                timeSetting(5400);
              }
            }}
            initValue={'기본 시간'}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleIsActive}>
          <Text>
            {isActive ? (
              <Icon name="pause" size={30} color={'white'} />
            ) : (
              <Icon name="play" size={30} color={'white'} />
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset}>
          <Text>
            <Icon name="stop" size={30} color={'white'} />
          </Text>
        </TouchableOpacity>
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
