import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';

export function HomeScreen() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    var interval: any;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds !== 0) {
          setSeconds(prevSeconds => prevSeconds - 1);
        } else {
          handleReset();
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formattedTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };

  const timeSetting = () => {
    setSeconds(2700);
  };

  const handleIsActive = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    timeSetting();
    setIsActive(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.timer}>
        <Text style={styles.text}>{formattedTime()}</Text>
        <TouchableOpacity onPress={() => timeSetting()}>
          <Text style={{...styles.text, fontSize: 18, paddingTop: 50}}>
            시간 선택
          </Text>
        </TouchableOpacity>
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
});
