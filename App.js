import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/components/home';
import Mytask from './src/components/mytask';
import CreateTask from './src/components/createtask';

const TaskContext = createContext();
const Stack = createNativeStackNavigator();

 const App = () => {
  const [Tasks, setTasks] = useState([]);
  
  return (
    <TaskContext.Provider value={{Tasks, setTasks}} >
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}options={{
          headerShown:false
        }}/>
        <Stack.Screen name="mytask" component={Mytask} options={{
          headerShown:false
        }}/>
        <Stack.Screen name="create" component={CreateTask} options={{
          headerShown:false
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </TaskContext.Provider>
  );
}
export default App;
export {
  TaskContext
};
