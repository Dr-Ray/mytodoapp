import { View, Text,Switch } from 'react-native'
import React, { useState } from 'react';
import tw from 'twrnc';

const ListSubtask = ({task}) => {
    let [done, setDone] = useState(task.done);
  return (
    <View style={tw`flex-row items-center my-2`}>
        <Switch value={done} onChange={() => {
            setDone(!done);
        }}/>
        <Text style={tw`text-sm font-medium`}>{task.taskname}</Text>
    </View>
  )
}

export default ListSubtask;