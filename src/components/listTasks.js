import { View, Text } from 'react-native'
import React from 'react'

const ListTasks = () => {

    useEffect(() => {
        getTask();
    },[tasks]);

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },3000)
    },[])

    const getTask = async () => {
        let tasksss = await AsyncStorage.getItem('tasks');
        setTaskss(JSON.parse(tasksss))
    }



    if(isLoading) {
        return (
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" />
                <Text>Loading</Text>
            </View> 
        )
    }else{
        return (
            <SafeAreaView style={[tw`flex-1 relative mt-8 mb-4 px-2`]}>
                <ScrollView>
                    {
                        tasks.map(task => (
                            <>
                                <View key={task.id} style={tw`flex-row mt-2`}>
                                    <View style={tw`flex-row`}>
                                        <View style={tw``}>
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
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default ListTasks