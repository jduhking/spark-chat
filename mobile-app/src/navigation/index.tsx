
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import type { RootStackParamList, AuthStackParamList, HomeStackParamList} from './types';
import AuthScreen from '../pages/AuthScreen';
import HomeScreen from '../pages/HomeScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const AuthNavigator = () => {
    return(
        <AuthStack.Navigator 
        id='AuthStack'
        initialRouteName='AuthScreen'
        screenOptions={{
            headerShown: false
        }}>
            <AuthStack.Screen name='AuthScreen' component={AuthScreen}/>
        </AuthStack.Navigator>
    )
}

const HomeNavigator = () => {
    return (
        <HomeStack.Navigator
        id='HomeStack'
        initialRouteName='Home'
        screenOptions={{
            headerShown: false
        }}
        >
            <HomeStack.Screen name='Home' component={HomeScreen}/>
        </HomeStack.Navigator>
    )
}
export const RootNavigator = () => {
    return (
        <RootStack.Navigator id='RootStack' initialRouteName='AuthStack' 
        screenOptions={{
            headerShown: false
        }}
        >
            <RootStack.Screen name='AuthStack' component={AuthNavigator} />
            <RootStack.Screen name='HomeStack' component={HomeNavigator} />
        </RootStack.Navigator>
    )
}
