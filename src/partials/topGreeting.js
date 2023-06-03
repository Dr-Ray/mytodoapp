import { View, Text } from 'react-native';
import React from 'react';
import tw from 'twrnc';

const TopGreeting = ({tasks, complete}) => {
    let d = new Date();
    let we = d.getDay();
    let days = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    let month = d.getMonth(),tday = d.getDate(),year = d.getFullYear();
    let today = `${months[month]} ${tday}, ${year}`;
    let df = [],re = 0; 
    tasks.forEach(task => {
        if(task.created === today) {
            df.push(task);
        }
    });
    if(df) {
        df.forEach(elem => {
            re +=elem.subtask.length;
        })
    }

  return (
    <View>
        <View style={tw`w-full flex-none`}>
            <Text style={tw`text-4xl font-bold`}>Good Day</Text>
        </View>

        <View style={tw`flex-row justify-between items-center my-4`}>
            <View>
                <Text style={tw`text-lg font-medium`}>Today</Text>
                <Text style={tw`text-sm`}>{months[month]} {tday}, {year}</Text>
            </View>
            <View>
                <Text style={tw`text-lg font-medium text-right`}>{complete}%</Text>
                <Text style={tw`text-sm`}>Completed</Text>
            </View>
        </View>

        <View>
            <View style={[tw`flex-row justify-between my-2`,{borderBottomWidth:2}]}>
                <Text style={tw`text-lg font-medium`}>{df.length} tasks</Text>
                <Text style={tw`text-lg font-medium`}>{re} sub tasks</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
                {days.map((day,i) => {
                    return ((i) == we) ? (
                        <Text style={tw`text-lg font-bold`} key={i}>{day}</Text> 
                    ) : (
                        <Text style={tw`text-sm`} key={i}>{day}</Text> 
                    )
                })}
            </View>
        </View>
    </View>
  )
}

export default TopGreeting;