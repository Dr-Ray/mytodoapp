import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ListTasks = ({task}) => {

    const deleteTask = async(id) => {
        try {
            let tasks = await AsyncStorage.getItem('tasks');
            tasks = JSON.parse(tasks);
            tasks = tasks.filter(elem => elem.id !== id);
            
            await AsyncStorage.setItem('tasks',JSON.stringify(tasks));
        } catch (error) {
            Alert.alert("Error",error.message)
        }
    }

    let {id,completed,category,taskname,subtask} = task;
    const navigation = useNavigation();
    return (
        <View style={tw`my-2 p-2 rounded-lg bg-white`}>
            <TouchableOpacity style={[tw`rounded-lg bg-white relative`,{}]} onPress={() => navigation.navigate('mytask',task)}>
                <View style={tw`flex-row justify-between items-center mt-4`}>
                    <View style={tw`h-8 w-8 rounded-full bg-blue-100 flex justify-center items-center`}>
                        <Ionicons name="person-outline" size={20} />
                    </View>
                    <View style={tw`text-4xl font-bold text-right`}>
                        {
                            completed?(
                                <Ionicons name="checkmark-done-outline" size={20} />
                            ):(
                                <Ionicons name="timer-sharp" size={20} />
                            )
                        }
                    </View>
                </View>
                <View style={tw`flex-row justify-between items-center mt-4`}>
                    <Text style={tw`text-lg font-medium`}>{category}</Text>
                    <Text style={tw`text-sm font-medium`}>Sub tasks</Text>
                </View>
                <View style={tw`flex-row justify-between my-2`}>
                    <Text style={tw`text-lg font-medium`}>{taskname}</Text>
                    <Text>{subtask.length}</Text>
                </View>
            </TouchableOpacity>
            <Text style={tw`text-right`}>
                <Ionicons name="trash" size={28} onPress={() => deleteTask(id)}/>
            </Text>
        </View>
  )
}

export default ListTasks;