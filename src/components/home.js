import { ScrollView, TouchableOpacity, View, Text, ActivityIndicator, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import Ionicons from '@expo/vector-icons/Ionicons';
import Navigation from '../partials/navigation';
import TopGreeting from '../partials/topGreeting';
import ListTasks from '../partials/listtasks';
import { useNavigation } from '@react-navigation/native';    

import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTaskss] = useState([]);

    let [progress, setProgress] = useState(0);

    const getTask = async () => {
        let tasksss = await AsyncStorage.getItem('tasks');
        setTaskss(JSON.parse(tasksss))
    }

    const deleteAllTask = async() => {
        try {
          await AsyncStorage.setItem('tasks',JSON.stringify([]))
        } catch (error) {
          Alert.alert("Error",error.message)
        }
    }

    const completion = () => {
        let all = tasks?.length;
        let sd = tasks?.filter(elem => elem.completed == true);

        if(sd?.length < 0) {
            return 0;
        }else{
            if(!all) {
                return 0;
            }else{
                let an =  Math.floor((sd?.length/all) * 100);
                return an;
            }
        }
    }


    useEffect(() => {
        getTask();
        setProgress(completion())
    },[tasks]);

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },3000)
    },[])
    
    if(isLoading) {
        return (
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" />
                <Text>Loading data...</Text>
            </View> 
        )
    }else{
        return (
            
            <View style={tw`bg-gray-100 h-full w-full relative`}>
                <StatusBar backgroundColor="#000" />
                <View style={tw`px-2 bg-gray-100 h-full w-full relative`}>
                    <Navigation deleteAllTask={deleteAllTask} />
                    {
                        (tasks?.length)?(
                            <>  
                                <TopGreeting tasks={tasks}  complete={progress} />
                                <ScrollView style={tw`mt-4 h-full`}> 
                                    {tasks.map((task, index) => (
                                        <ListTasks key={index} task={task} />
                                    ))}
                                </ScrollView>
                            </>
                        ):(
                            <View style={tw`flex-1 p-2 items-center justify-center`}>
                                <Text style={tw`text-2xl font-bold`}>You don't have any task</Text>
                            </View>
                        )
                    }
                    <View style={tw`w-full flex-row justify-center absolute bottom-10 `}>
                        <TouchableOpacity style={tw`w-15 h-15 bg-black rounded-full items-center justify-center`} 
                            onPress={() => {
                                navigation.navigate('create')
                            }}>
                            <Ionicons name="add" size={32} style={tw`text-white`}/>
                        </TouchableOpacity> 
                    </View>
                </View>
            </View>
        )
    }
}

export default Home;