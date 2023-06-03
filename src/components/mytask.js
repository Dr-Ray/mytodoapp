import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react';
import tw from 'twrnc';
import Navigation from '../partials/navigation';
import ListSubtask from '../partials/list';
import { useNavigation, useRoute } from '@react-navigation/native';


import AsyncStorage from '@react-native-async-storage/async-storage';

const Mytask = () => {
    const navigation= useNavigation();
    let {params} = useRoute();
    let {
        taskname, category, created, 
        description, endDate, subtask,
        id,completed
    } = params;

    const completeTask = async(id) => {
        try {
            let tasks = await AsyncStorage.getItem('tasks');
            tasks = JSON.parse(tasks);

            let currentTask = tasks.filter(elem => elem.id == id);
            let otherTasks = tasks.filter(elem => elem.id !== id);

            // update task 
            currentTask[0].completed = true;

            tasks = otherTasks.concat(currentTask);
            
            await AsyncStorage.setItem('tasks',JSON.stringify(tasks));
            navigation.navigate('Home')
        } catch (error) {
            Alert.alert("Error",error.message)
        }
    }

    return (
        <View style={tw`bg-gray-100 h-full relative`}>
            <View style={tw`px-2`}>
                <Navigation />
            </View>
            <View>
                <Text style={tw`text-4xl font-bold text-center`}>{taskname}</Text>
                <Text style={tw`text-lg py-2 font-bold px-2`}>{category}</Text>
            </View>
            <ScrollView style={tw`px-2`}>
                <View style={tw``}>
                    <View style={tw`my-4`}>
                        <Text style={tw`text-lg font-bold`}>Description</Text>
                        <Text style={tw`py-2`}>{description}</Text>
                    </View>
                    <View style={tw`flex-row justify-between my-4`}>
                        <View>
                            <Text style={tw`text-lg font-bold`}>Created</Text>
                            <Text>{created}</Text>
                        </View>
                        <View>
                            <Text style={tw`text-lg font-bold`}>Ending</Text>
                            <Text>{endDate}</Text>
                        </View>
                    </View>
                    <View style={tw`my-4`}>
                        <Text style={tw`text-lg font-bold`}>Completed</Text>
                        <View>
                            {
                                completed?(<Text style={tw`text-lg font-medium text-green-300`}>Completed</Text>):(<Text style={tw`text-lg font-medium  text-red-300`}>Not Completed</Text>)
                            }
                        </View>
                    </View>
                    <View style={tw`my-4`}>
                        <Text style={tw`text-lg font-medium`}>Sub tasks</Text>
                        <View>
                            {
                                (subtask == [])?(
                                    subtask.map((task,i) => (
                                        <ListSubtask key={i} task={task} />
                                    ))
                                ):(
                                    <Text>No sub Task</Text>
                                )
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={tw`bg-green-300 rounded-lg py-4 mt-auto`} onPress={() => completeTask(id)}>
                <Text style={tw`text-center text-white`}>Complete this task</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Mytask;