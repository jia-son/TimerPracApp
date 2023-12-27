import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

const STORAGE_KEY = '@toDos';

export function TodoScreen() {
  const navigation = useNavigation();

  const [text, setText] = useState('');
  const [toDos, setToDos] = useState<{
    [key: string]: {text: string; done: Boolean};
  }>({});
  const [selectKey, setSelectKey] = useState('');
  const [selectText, setSelectText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateText, setUpdateText] = useState('');

  const addToDo = async () => {
    if (text === '') {
      return;
    }

    const newToDos = Object.assign({}, toDos, {
      [Date.now()]: {text, done: false},
    });
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText('');
  };

  const saveToDos = async (toSave: any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeText = (payload: string) => {
    setText(payload);
  };

  const changeCheckBox = (key: string) => {
    const newToDos = {...toDos};
    newToDos[key].done = !newToDos[key].done;
    setToDos(newToDos);
    saveToDos(newToDos);
  };

  const loadToDos = async () => {
    try {
      const storeGet = await AsyncStorage.getItem(STORAGE_KEY);
      setToDos(JSON.parse(storeGet ?? '[]'));
    } catch (e) {
      console.log(e);
    }
  };

  const deleteToDo = (key: string) => {
    Alert.alert('Delete To Do', 'Are you sure?', [
      {text: 'Cancel'},
      {
        text: "I'm sure",
        onPress: () => {
          const newToDos = {...toDos};
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };

  const updateToDo = (key: string) => {
    setSelectKey(key);
    setSelectText(toDos[selectKey].text);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleUpdate = () => {
    const newToDos = {
      ...toDos,
      [selectKey]: {...toDos[selectKey], text: updateText},
    };

    setToDos(newToDos);
    saveToDos(newToDos);
    toggleModal();
  };

  useEffect(() => {
    loadToDos();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.titleText}>ToDo List</Text>
      </View>
      <View style={styles.todoContainer}>
        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          value={text}
          placeholderTextColor="grey"
          placeholder="Add a To Do"
          style={styles.input}
        />
        <ScrollView>
          {Object.keys(toDos).map(key => (
            <View style={styles.toDo} key={key}>
              <View style={styles.toDoBoxAndToDo}>
                {toDos[key].done === false ? (
                  <TouchableOpacity onPress={() => changeCheckBox(key)}>
                    <Icon
                      name="checkbox-blank-outline"
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => changeCheckBox(key)}>
                    <Icon
                      name="checkbox-marked-outline"
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                )}
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
              </View>
              <View style={styles.toDoUpdateBtnAndtrashBtn}>
                <TouchableOpacity onPress={() => updateToDo(key)}>
                  <Icon
                    name="lead-pencil"
                    size={20}
                    color="white"
                    style={styles.toDoUpdateBtn}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Icon name="trash-can-outline" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit To Do</Text>
            <TextInput
              defaultValue={selectText}
              style={styles.modalInput}
              onChangeText={text => setUpdateText(text)}
            />
            <TouchableOpacity onPress={handleUpdate}>
              <Icon name="check-bold" size={30} style={styles.updateBtn} />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
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
    paddingHorizontal: 20,
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
  },
  header: {
    flex: 2,
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
  todoContainer: {
    flex: 7,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    fontSize: 15,
  },
  toDo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  toDoBoxAndToDo: {
    flexDirection: 'row',
  },
  toDoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 15,
  },
  toDoUpdateBtnAndtrashBtn: {
    flexDirection: 'row',
  },
  toDoUpdateBtn: {
    paddingRight: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingVertical: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 20,
  },
  modalInput: {
    height: 40,
    borderColor: 'black',
    borderBottomWidth: 1,
    paddingHorizontal: 100,
  },
  updateBtn: {
    marginTop: 35,
  },
});
