import {TextInput, View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native'
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, logout } from '../features/login/login-slice';



interface Props {

}
interface RegisterForm {
    username: string,
    email: string,
    passwordOne: string,
    passwordTwo: string,
}

const RegisterComponent: React.FC<Props> = ({}) => {

    const dispatch = useAppDispatch()

    const RegisterSchema = Yup.object().shape({
        username: Yup.string().email().required("Username is required"),
        email: Yup.string().email().required("Email is required"),
        passwordOne: Yup.string()
          .required("Password is required")
          .min(4, "Password is too short - should be 6 chars minimum"),
        passwordTwo: Yup.string()
        .required("A second password is required")
        .min(4, "Password is too short - should be 6 chars minimum"),
    });

    const Register = async (formData: RegisterForm) => {

        const response = await fetch('http://localhost:8080register', {
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
        } = useForm<RegisterForm>({
        defaultValues:{
            username: "",
            email: "",
            passwordOne: "",
            passwordTwo: ""

        },
        resolver: yupResolver(RegisterSchema),
        })
    
    const onSubmit = async (data: RegisterForm) =>{ 
      
        const response = await Register(data);
    
        if(response.status === 200){
          console.log('User has registered!')
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
                placeholder="Username"
                style={styles.signInInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
        </View>
        <View style={styles.emailField}>
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
        <View style={styles.passwordOneField}>
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
            name="passwordOne"
          />
        </View>
        <View style={styles.passwordTwoField}>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.signInInput}
                placeholder="Confirm Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="passwordTwo"
          />
          {errors.email && <Text>{errors.email.message}</Text>}
          {errors.passwordOne && <Text>{errors.passwordOne.message}</Text>}
          {errors.passwordTwo && <Text>{errors.passwordTwo.message}</Text>}
        </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} 
      style={styles.submitButton}><Text style={styles.loginText}>Sign up</Text></TouchableOpacity>
      <TouchableOpacity style={styles.signinLinkContainer}><Text style={styles.signInLink}>
      Already have an account? Log in
        </Text></TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
userField: {
    borderRadius: 50,
    width: '100%',
    left: '15%',
    position: 'absolute',
    bottom: '92%',
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
emailField: {
    borderRadius: 50,
    width: '100%',
    left: '15%',
    position: 'absolute',
    bottom: '77%',
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
passwordOneField: {
    borderRadius: 50,
    position: 'absolute',
    left: '15%',
    width: '100%',
    bottom: '62%',
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
passwordTwoField: {
    borderRadius: 50,
    position: 'absolute',
    left: '15%',
    width: '100%',
    bottom: '47%',
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
  signinLinkContainer: {
    bottom: '18%',
    left: '22%',
    position: 'absolute'
    
  },
  signInLink: {
    textDecorationStyle: 'solid',
    fontFamily: 'Wendy One',
    textDecorationLine: 'underline',
    fontSize: 16,
  }, 
  signInInput: {
    fontFamily: 'Wendy One',
    fontSize: 24, 
  }
})

export default RegisterComponent;