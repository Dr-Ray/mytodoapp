import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView,StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateTask = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  let [taskName, setTaskName] = useState('');
  let [description, setDescription] = useState('');
  let [category, setCategory] = useState('');

  const [startDate, setstartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [startTime, setstartTime] = useState(new Date());
  const [dueTime, setDueTIme] = useState(new Date());

  const [drpVal, setdrpVal] = useState(null);

  const datadropdown = [
    {label:"Categories", value:"church"},
    {label:"Church", value:"church"},
    {label:"Mosque", value:"mosque"},
    {label:"Football", value:"football"},
    {label:"Children", value:"children"},
  ]

  const dueChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDueDate(currentDate);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setstartDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showMode2 = (currentMode) => {
    DateTimePickerAndroid.open({
      value: dueDate,
      onChange:dueChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showMode3 = (ld,currentMode) => {
    if(ld == 'due') {
      DateTimePickerAndroid.open({
        value: dueTime,
        onChange:(event, selectedDate) => {
          const currentDate = selectedDate;
          setDueTIme(currentDate);
        },
        mode: currentMode,
        is24Hour: true,
      });
    }else {
      DateTimePickerAndroid.open({
        value: startTime,
        onChange:(event, selectedDate) => {
          const currentDate = selectedDate;
          setstartTime(currentDate);
        },
        mode: currentMode,
        is24Hour: true,
      });
    }
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const dueDatepicker = () => {
    showMode2('date');
  };

  const showTimepicker = () => {
    showMode3('kk','time');
  };

  const dueTimepicker = () => {
    showMode3('due','time');
  };
  
  const addTask = async() => {
    setIsLoading(true)
    let task = {
      id:Math.floor(Math.random()*999999),
      taskname:taskName,
      category:drpVal,
      description:description,
      startDate:startDate.toLocaleString("en-US"),
      startTime:startTime.toLocaleString("en-US"),
      endDate:dueDate.toLocaleString("en-US"),
      endTime:dueTime.toLocaleString("en-US"),
      completed:false,
      notified:false
    }
  
    try {
      let tasks = await AsyncStorage.getItem('tasks');
      if(tasks === null) {
        tasks = []
      }else{
        tasks = JSON.parse(tasks)
      }
      
      await AsyncStorage.setItem('tasks', JSON.stringify([...tasks, task]))
      setIsLoading(false)
      navigation.navigate('Home')
    } catch (error) {
      Alert.alert("Error",error.message)
    }
  }
  
  return (
    <View style={[tw`flex-1 relative px-2`]}> 
      {
        isLoading?(
          <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" />
                <Text>Creating...</Text>
            </View> 
        ): (
          <View>
            <ScrollView>
        <View style={tw`bg-gray-300 px-2 my-3 flex-row items-center rounded-lg`}>
          <FontAwesome name="pencil" size={15} />
          <TextInput placeholder='Task Name' style={tw`ml-2 bg-gray-300 my-3 w-full`} value={taskName} onChangeText={(text) => {
            setTaskName(text)
          }}/>
        </View>

        <View style={tw`bg-gray-300 my-3 flex-row items-center rounded-lg`}>
          <Dropdown 
            style={tw`w-full bg-gray-300 p-2 rounded-lg`}
            data={datadropdown}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={drpVal}
            onChange={item => {
              setdrpVal(item.value)
            }}
            renderLeftIcon={() => (
              <FontAwesome name='tasks' size={15} style={tw`mr-2`} />
            )}
          />
        </View>

        <View style={tw`bg-gray-300 p-2 my-3 flex-row rounded-lg h-40`}>
          <TextInput 
            placeholder='Add description' 
            textAlignVertical='top' 
            multiline={true} 
            value={description} 
            inputMode="text"
            style={tw`bg-gray-300 w-full rounded-lg h-full`} 
            onChangeText={(text) => {
              setDescription(text)
            }}
          />
        </View>

        <View style={tw`bg-gray-300 p-3 my-3 flex-row rounded-lg`}>
            <FontAwesome name="calendar" size={15} style={tw`py-3`}/>
            <View style={tw`w-full`}>
              <TouchableOpacity style={tw`p-2 flex-row items-center justify-between`} onPress={showDatepicker}>
                <View style={tw`flex-row flex-row items-center`} >
                  <Text style={tw`text-sm`}>Start date</Text>
                  </View>
                <Text style={tw`text-sm font-medium`}>{startDate.toLocaleString("en-US")}</Text>
              </TouchableOpacity>
              <View style={tw`my-2`}></View>
              <TouchableOpacity style={tw`p-2 flex-row items-center justify-between`} onPress={dueDatepicker}>
                <View style={tw`flex-row flex-row items-center`} >
                  <Text style={tw`text-sm`}>Due date</Text>
                  </View>
                <Text style={tw`text-sm font-medium`}>{dueDate.toLocaleString("en-US")}</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View style={tw`bg-gray-300 p-3 my-3 flex-row rounded-lg`}>
            <FontAwesome name="clock-o" size={15} style={tw`py-3`}/>
            <View style={tw`w-full`}>
              <TouchableOpacity style={tw`p-2 flex-row items-center justify-between`} onPress={showTimepicker}>
                <View style={tw`flex-row flex-row items-center`} >
                  <Text style={tw`text-sm`}>Start Time</Text>
                  </View>
                <Text style={tw`text-sm font-medium`}>{startTime.toLocaleTimeString("en-US")}</Text>
              </TouchableOpacity>
              <View style={tw`my-2`}></View>
              <TouchableOpacity style={tw`p-2 flex-row items-center justify-between`} onPress={dueTimepicker}>
                <View style={tw`flex-row flex-row items-center`} >
                  <Text style={tw`text-sm`}>Due Time</Text>
                  </View>
                <Text style={tw`text-sm font-medium`}>{dueTime.toLocaleTimeString("en-US")}</Text>
              </TouchableOpacity>
            </View>
        </View>
        
       
            </ScrollView>
            <TouchableOpacity style={[tw`w-full h-15 my-2 bg-black rounded-lg items-center justify-center`, styles.bgblue]} 
              onPress={() => {
                addTask()
              }}>
              <Text style={tw`text-white`}>Create</Text>
            </TouchableOpacity> 
          </View>
        )
      }
    </View>
  )
}

export default CreateTask;

const styles = StyleSheet.create({
  hrRow: {
      flexDirection:'row',
      alignItems: "center",
  },
  row: {
      flexDirection:'row',
  },
  gap2: {
      gap: 2,
  },
  centered: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
  },
  formGroup: {
      marginVertical: 10,
  },
  formControl: {
      width: "100%",
      padding: 10,
      borderRadius: 8,
      minHeight: 15,
      backgroundColor: "#eee",
  },
  formInline: {
      backgroundColor:"#eee",
      padding: 7,
      width: "100%",
      borderRadius: 15,
      flexDirection:'row',
      alignItems: "center",
  },searchForm: {
      width: "100%",
      padding: 5,
      outline: "#101828",
      backgroundColor:"#eee",
  
  },
  btn: {
      padding: 10,
      width: "100%",
      minHeight: 40,
      borderRadius: 8,
  },

  textwhite: {
      color: "#fff",
  },
  bgblue: {
      backgroundColor: "#5653FC",
      color: "#fff",
  },
  bgblack: {
      backgroundColor: "#101828",
      color: "#fff",
  },
  bggreen: {
      backgroundColor: "#42B6B3",
      color: "#fff",
  },
  bgwhite: {
      backgroundColor: "#fff",
      color: "#101828",
  },
  curveIn: {
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
  },
  curve: {
      borderRadius: 20,
  },
  top2: {
      position: "relative",
      top: 15,
  },
  p: {
      marginTop:8,
      marginBottom:8,
  }

})