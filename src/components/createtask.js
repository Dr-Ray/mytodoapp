import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateTask = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  let [taskName, setTaskName] = useState('');
  let [description, setDescription] = useState('');
  let [category, setCategory] = useState('');
  const [endDate, setEndDate] = useState(new Date());

  let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let d = new Date();
  let month = d.getMonth(), tday = d.getDate(), year = d.getFullYear();
  let today = `${months[month]} ${tday}, ${year}`;
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: endDate,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const addTask = async() => {
    let task = {
      id:Math.floor(Math.random()*999999),
      taskname:taskName,
      category:category,
      subtask:[],
      description:description,
      created:today,
      endDate:endDate.toLocaleString(),
      completed:false
    }
  
    try {
      let tasks = await AsyncStorage.getItem('tasks');
      if(tasks === null) {
        tasks = []
      }else{
        tasks = JSON.parse(tasks)
      }
      
      await AsyncStorage.setItem('tasks',JSON.stringify([...tasks,task]))
      navigation.navigate('Home')
    } catch (error) {
      Alert.alert("Error",error.message)
    }
  }
  
  return (
    <View style={[tw`flex-1 justify-center items-center bg-gray-100 relative px-2`]}> 
      <Text style={tw`text-3xl py-2 font-medium px-2`}>Create Task</Text>
      <View style={[tw`w-full `]}>
        <TextInput placeholder='Task Name' style={tw`bg-gray-300 p-2 text-lg my-3 rounded-lg`} value={taskName} onChangeText={(text) => {
            setTaskName(text)
          }}/>
          <TextInput placeholder='Category' style={tw`bg-gray-300 p-2 text-lg my-3 rounded-lg`} value={category} onChangeText={(text) => {
            setCategory(text)
          }}/>
          <TouchableOpacity onPress={showDatepicker} style={tw`flex-row bg-gray-300 p-2 rounded-lg`}>
            <Text style={tw`text-lg mr-4`}>End Date</Text>
            <FontAwesome name="calendar" size={20} />
          </TouchableOpacity>
          <Text style={tw`text-sm font-medium`}>{endDate.toLocaleString()}</Text>
          <TextInput placeholder='Description' textAlignVertical='top' multiline={true} value={description} inputMode="text" style={tw`bg-gray-300 p-2 text-lg my-3 rounded-lg h-40`} onChangeText={(text) => {
            setDescription(text)
          }}/>
          <View style={tw`w-full flex-row justify-end`}>
            <TouchableOpacity style={tw`w-15 h-15 bg-black rounded-full items-center justify-center`} 
              onPress={() => {
                addTask()
              }}>
              <FontAwesome name="save" size={25} style={tw`text-white`} />
            </TouchableOpacity> 
        </View>
      </View>
      {
        isLoading&&(
          <View style={tw`absolute h-full w-full justify-center items-center`}>
            <Text>Loading....</Text>
          </View>
        )
      }
    </View>
  )
}

export default CreateTask;