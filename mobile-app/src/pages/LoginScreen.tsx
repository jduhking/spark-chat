import { StyleSheet, TextInput, View, Text, Button} from 'react-native';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, logout } from '../features/login/login-slice';
import { useAppNavigation } from '../utils/useAppNavigation';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"


interface LoginForm {
  email: string,
  password: string
}

const LoginScreen = () => {

  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state) => state.login.value)
  const navigation = useAppNavigation();
  
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 6 chars minimum"),
  });

  const Login = async (formData: LoginForm) => {

    
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  });
  
    return response;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues:{
      email: "",
      password: ""
    },
    resolver: yupResolver(LoginSchema),
  })

  const onSubmit = async (data: LoginForm) =>{ 
  
    const response = await Login(data);

    if(response.status === 200){
      console.log('User has been logged in!')
      dispatch(login())
        navigation.navigate("HomeStack", {
          screen: 'Home'
        })
      }
      
  };
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.email && <Text>{errors.email.message}</Text>}
      {errors.password && <Text>{errors.password.message}</Text>}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
  
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;