import {TextInput, View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native'
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, logout } from '../features/login/login-slice';



interface Props {

}
interface LoginForm {
    email: string,
    password: string
}

const LoginComponent: React.FC<Props> = ({}) => {

    const dispatch = useAppDispatch()

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
        }
          
      };
    return (
        <View style={styles.loginArea}>
        <View style={styles.userField}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email"
                style={styles.signInInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
        </View>
        <View style={styles.passwordField}>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.signInInput}
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
        </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} 
      style={styles.submitButton}><Text style={styles.loginText}>Login</Text></TouchableOpacity>
      <TouchableOpacity style={styles.signupLinkContainer}><Text style={styles.signupLink}>New User? Sign up</Text></TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
userField: {
    borderRadius: 50,
    width: '100%',
    left: '15%',
    position: 'absolute',
    bottom: '80%',
    backgroundColor: '#fff',
    height: '12%',
    paddingTop: 10,
    paddingLeft: 20,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
},
passwordField: {
    borderRadius: 50,
    position: 'absolute',
    left: '15%',
    width: '100%',
    bottom: '50%',
    backgroundColor: '#fff',
    height: '12%',
    paddingTop: 10,
    paddingLeft: 20,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
},
  loginArea: {
    width: '100%',
    height: '60%',
    padding: 50,
    position: 'relative',
    backgroundColor: '#F8D958',
    borderTopStartRadius: 100,
    borderTopEndRadius: 100
  },
  submitButton: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    width: '95%',
    height: '18%',
    position: 'absolute',
    bottom: '25%', 
    left: '15%',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,

  },
  loginText: {
    color: '#fff',
    fontFamily: 'Wendy One',
    fontSize: 36
  },
  signupLinkContainer: {
    bottom: '18%',
    left: '22%',
    position: 'absolute'
    
  },
  signupLink: {
    textDecorationStyle: 'solid',
    fontFamily: 'Wendy One',
    textDecorationLine: 'underline',
    fontSize: 18,
  }, 
  signInInput: {
    fontFamily: 'Wendy One',
    fontSize: 24, 
  }
})

export default LoginComponent;