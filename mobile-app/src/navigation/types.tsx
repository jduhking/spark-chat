
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    AuthStack: NavigatorScreenParams<AuthStackParamList>
    HomeStack: NavigatorScreenParams<HomeStackParamList>
}
export type AuthStackParamList = {
    AuthScreen: undefined
}
export type HomeStackParamList = {
    Home: undefined
    Profile: undefined
}
