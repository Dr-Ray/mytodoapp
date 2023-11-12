import { ActivityIndicator, Image, Button, SafeAreaView, ScrollView, StyleSheet, Text, Platform, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import tw from 'twrnc'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});



const Home2 = () => {    
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTaskss] = useState([]);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        });

        return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const getTask = async () => {
        let tasksss = await AsyncStorage.getItem('tasks');
        setTaskss(JSON.parse(tasksss))
    }

    const deleteAllTask = async() => {
        Alert.alert('Are you sure?', 'Are you sure?', [
        {
            text: 'Delete',
            onPress: async() => {
                try {
                    await AsyncStorage.setItem('tasks',JSON.stringify([]))
                } catch (error) {
                    Alert.alert("Error",error.message)
                }
            },
            style: 'cancel',
        },
        {
            text: 'No', 
            onPress: async() => {
                Alert.alert("Cancelled",error.message)
            }},
        ]);
        
    }

    const completion = () => {
        let sd = tasks?.filter(elem => elem.completed == true);

        if(sd?.length < 0) {
            return 0;
        }else{
            return sd?.length;
        }
    }

    const notify = () => {
        let noww = new Date().getMilliseconds();
        tasks?.forEach(elem => {
            if(!elem.notified) {
                if(new Date(elem.startDate) <= noww) {
                    sendNotification(`${elem.taskname} has started`)
                    elem.notified = true;
                }
            }
        }) 
    }

    const ongoing = () => {
        let sd = tasks?.filter(elem => elem.completed == false);

        if(sd?.length < 0) {
            return 0;
        }else{
            return sd?.length;
        }
    }

    const sendNotification = async(body) => {
        await schedulePushNotification(body);
    }

    useEffect(() => {
        getTask();
    },[tasks]);

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },3000)
        // notify()
    },[])
    
    if(isLoading) {
        return (
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" />
                <Text>Loading</Text>
            </View> 
        )
    }else{
        return (
            <SafeAreaView style={[tw`mt-8 mb-4 px-2`]}>
                <ScrollView>
                    <View style={tw`w-full py-2`}>
                        <View style={styles.hrRow}>
                            <View style={tw`w-32`}>
                                <Text style={tw`font-bold text-lg`}>WorkSpace</Text>
                            </View>
                            <View style={tw`ml-4 flex-1`}>
                                {/* <View>
                                    <View className="form-inline" style={styles.formInline}>
                                        <TextInput type="search" name="search" id="search" style={styles.searchForm} placeholder="Type to search" />
                                        <TouchableOpacity type="submit" className="inline-btn">
                                            <FontAwesome size={20} name="search"/>
                                        </TouchableOpacity>
                                    </View>
                                </View> */}
                            </View>
                            <View className="ml-4" style={tw`ml-6`}>
                                <FontAwesome size={20} name="bell"/>
                            </View>
                        </View>
                        <View className="my-4 row" style={styles.row}>
                            <View className="">
                                <Image source={require("../../assets/user.png")}  />
                            </View>
                            <View className="ml-4" style={tw`ml-4`}>
                                <Text style={tw`text-xl font-bold`}>Hi, Abigail Umoh</Text>
                                <Text style={tw`text-sm`}>
                                    Have a nice day today!
                                </Text>
                            </View>
                        </View>
                        <ScrollView horizontal>
                            <View style={[tw`my-4 justify-between flex-row gap-2 items-center`, styles.gap2]}>
                                <TouchableOpacity  style={[tw`w-32 h-24 text-white p-2`, styles.bgblack, styles.centered, styles.curve]} onPress={()=> {
                                    navigation.navigate('create')
                                }}>
                                    <FontAwesome size={20} color={"#fff"} name="tasks"/>
                                    <Text style={tw`text-white`}>
                                        New Task
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[tw`w-32 h-24 text-white p-2 ml-4`, styles.bgblack, styles.centered, styles.curve]}>
                                    <FontAwesome size={20} color={"#fff"} name="group"/>
                                    <Text style={tw`text-white`}>
                                        Categories
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity  style={[tw`w-32 h-24 text-white p-2 ml-4`, styles.bgblack, styles.centered, styles.curve]}>
                                    <FontAwesome size={20} color={"#fff"} name="gear"/>
                                    <Text style={tw`text-white`}>
                                        Ongoing
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity  style={[tw`w-32 h-24 text-white p-2 ml-4`, styles.bgblack, styles.centered, styles.curve]}>
                                    <FontAwesome size={20} color={"#fff"} name="check"/>
                                    <Text style={tw`text-white`}>
                                        Completed
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                    {
                        (tasks?.length)?(
                            <>  
                                <View key={tasks.id} style={tw`mt-4`}>
                                    <View style={tw`flex-row justify-between py-2`}> 
                                        <Text style={tw`text-xl font-bold`}>Your Task</Text>
                                        <Text style={tw`text-sm`}>See all</Text>
                                    </View>
                                    <View style={[tw`flex-row`, {gap:"2px"}]}>
                                        <TouchableOpacity style={[tw`justify-between p-2 flex-1`, styles.curve, styles.bgblue]}>
                                            <Text style={tw`text-white`}>{tasks.length}</Text>
                                            <View style={tw`flex-row items-center justify-between`}>
                                                <Text style={tw`text-white`}>To do</Text>
                                                <FontAwesome size={20} color={"#fff"} name="arrow-right"/>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={tw`ml-2 h-72 w-42`}>
                                            <View style={""}>
                                                <TouchableOpacity style={[tw`mb-2 w-full h-34 p-2 justify-between`, styles.bgblack, styles.curve]}>
                                                    <Text style={tw`text-white`}>{ongoing()}</Text>
                                                    <View style={tw`flex-row items-center justify-between`}>
                                                        <Text style={tw`text-white`}>Ongoing</Text>
                                                        <FontAwesome size={20} color={"#fff"} name="arrow-right"/>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[tw`mt-2 w-full h-34 p-2 justify-between`, styles.bggreen, styles.curve]}>
                                                    <Text style={tw`text-white`}>
                                                        {completion()}
                                                    </Text>
                                                    <View style={tw`flex-row items-center justify-between`}>
                                                        <Text style={tw`text-white`}>Completed</Text>
                                                        <FontAwesome size={20} color={"#fff"} name="arrow-right"/>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={tw`h-full mt-4`}>
                                    <View style={tw`py-2 flex-row items-center justify-between`}>
                                        <Text style={tw`text-xl font-bold`}>Activity</Text>
                                        <Text style={tw`text-sm`}>See all</Text>
                                    </View>
                                    {
                                        tasks.map(task => (
                                            <>
                                                <View key={task.id} style={tw`flex-row mt-2`}>
                                                    <View style={tw`flex-row`}>
                                                        <Image source={require("../../assets/user.png")}  />
                                                        <View style={tw`ml-4`}>
                                                            <Text style={tw`font-bold text-lg`}>{task.taskname}</Text>
                                                            <Text style={styles.p}>{task.endDate}</Text>
                                                            <Text  style={styles.p}>
                                                                {task.description}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </>
                                        ))
                                    }
                                </View>
                            </>
                        ):(
                            <View style={tw`mt-4`}>
                                <View style={tw`flex-row justify-between py-2`}> 
                                    <Text style={tw`text-xl font-bold`}>Your Task</Text>
                                    <Text style={tw`text-sm`}>See all</Text>
                                </View>
                                <View style={[tw`flex-row`, {gap:"2px"}]}>
                                    <TouchableOpacity style={[tw`justify-between p-2 flex-1`, styles.curve, styles.bgblue]}>
                                        <Text style={tw`text-white`}>15</Text>
                                        <View style={tw`flex-row items-center justify-between`}>
                                            <Text style={tw`text-white`}>To do</Text>
                                            <FontAwesome size={20} color={"#fff"} name="arrow-right"/>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={tw`ml-2 h-72 w-42`}>
                                        <View style={""}>
                                            <TouchableOpacity style={[tw`mb-2 w-full h-34 p-2 justify-between`, styles.bgblack, styles.curve]}>
                                                <Text style={tw`text-white`}>5</Text>
                                                <View style={tw`flex-row items-center justify-between`}>
                                                    <Text style={tw`text-white`}>Ongoing</Text>
                                                    <FontAwesome size={20} color={"#fff"} name="arrow-right"/>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[tw`mt-2 w-full h-34 p-2 justify-between`, styles.bggreen, styles.curve]}>
                                                <Text style={tw`text-white`}>5</Text>
                                                <View style={tw`flex-row items-center justify-between`}>
                                                    <Text style={tw`text-white`}>Completed</Text>
                                                    <FontAwesome size={20} color={"#fff"} name="arrow-right"/>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default Home2;

async function schedulePushNotification(body) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Remainder",
        body: body,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 1 },
    });
  }

async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!');
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync({ projectId: 'ee2eca4d-cdd6-453e-9eb2-55a9c370a78a' })).data;
    } else {
        Alert.alert('Must use physical device for Push Notifications');
    }
  
    return token;
}



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