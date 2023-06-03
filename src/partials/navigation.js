import {View, SafeAreaView } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Navigation = ({deleteAllTask}) => {
  return (
    <SafeAreaView style={[tw`mt-8 mb-4`]}>
      <View style={tw`flex-row justify-between items-center`}>
        <View>
            <View style={tw`h-10 w-10 rounded-full bg-blue-100 flex justify-center items-center`}>
                <Ionicons name="person-outline" size={30} />
            </View>
        </View>
        <View style={tw`flex-row items-center`}>
            <View style={tw`mr-4`}>
                <FontAwesome size={25} name="trash" onPress={deleteAllTask} />
            </View>
            <View>
                <Ionicons name="add-circle-outline" size={30} />
            </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Navigation;