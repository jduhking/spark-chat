import { useEffect } from 'react'
import { StyleSheet, Image, View, Text, Button} from 'react-native';
import { useAppNavigation } from '../utils/useAppNavigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LoginComponent from '../components/LoginComponent'
import { login, logout } from '../features/login/login-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks'
import RegisterComponent from '../components/RegisterComponent';



const AuthScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const isLoggedIn = useAppSelector((state) => state.login.value)

  useEffect(() => {
    if(isLoggedIn){
    navigation.navigate("HomeStack", {
      screen: 'Home'
    })
  }
  }, [isLoggedIn])

  return (
    <View
    style={{
        paddingTop: insets.top,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative'
    }}>
      <Image 
      style={styles.spark}
      source={require('../../assets/icons/spark_66x92.png')}/>
      <RegisterComponent />
    </View>

  )
  
}

const styles = StyleSheet.create({
  container: {
   backgroundColor: '#fff',
   justifyContent: 'flex-start'
  },
  spark: {
    marginBottom: 60
  }

});

export default AuthScreen;