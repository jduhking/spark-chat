import React, {useState} from 'react'
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppNavigation } from '../utils/useAppNavigation';

const HomeScreen = () => {
    const navigation =  useAppNavigation();
    return (
    <View style={styles.container}>
        <Text>Hello, welcome to SparkChat!</Text>
        <TouchableOpacity onPress={() => navigation.navigate(
            'AuthStack', 
            {
                screen: 'Login'
            }
        )}>
            <Text>Go to Login</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default HomeScreen;