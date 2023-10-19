import React, {useState} from 'react'
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppNavigation } from '../utils/useAppNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
const HomeScreen = () => {
    const navigation =  useAppNavigation();
    return (
    <SafeAreaView>
        <Text>Hello, welcome to SparkChat!</Text>
        <TouchableOpacity onPress={() => navigation.navigate(
            'AuthStack', 
            {
                screen: 'AuthScreen'
            }
        )}>
            <Text>Go to Login</Text>
        </TouchableOpacity>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({

  });

  export default HomeScreen;