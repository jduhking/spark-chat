
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    AuthStack: NavigatorScreenParams<AuthStackParamList>
    HomeStack: NavigatorScreenParams<HomeStackParamList>
}
export type AuthStackParamList = {
    Login: undefined
    Register: undefined
}
export type HomeStackParamList = {
    Home: undefined
    Profile: undefined
}
