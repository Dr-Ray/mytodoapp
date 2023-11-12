import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import registerNNPushToken from 'native-notify';

import Home2 from './src/components/home2';
import Login from './src/components/login';
import Register from './src/components/register';
import Mytask from './src/components/mytask';
import CreateTask from './src/components/createtask';
import ListTasks from './src/components/listTasks';



const TaskContext = createContext();
const Stack = createNativeStackNavigator();

 const App = () => {
  // registerNNPushToken(14768, 'DHu6OWjsP3BBNgJ1VzGpA0');
  const [Tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  
  return (
    <TaskContext.Provider value={{Tasks, setTasks, user, setUser, categories, setCategories}} >
      <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="Home" component={Home2}options={{
          headerShown:false
        }}/>
        <Stack.Screen name="mytask" component={Mytask} options={{
          headerShown:false
        }}/>
        <Stack.Screen name="create" component={CreateTask} options={{
          headerShown:true, 
          title:"Create Task"
        }}/>
        <Stack.Screen name="list" component={ListTasks} options={{
          headerShown:true, 
          title:"All Tasks"
        }}/>
         <Stack.Screen name="login" component={Login} options={{
          headerShown:false
        }}/>
        <Stack.Screen name="register" component={Register} options={{
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
