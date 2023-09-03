import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { login, logout } from '../features/login/login-slice'
import { User } from '../models/user'


export default function HomePage() {

  const [user, setUser] = useState({ username: 'John' })
  const isLogin = useAppSelector((state) => state.login.value)
  const dispatch = useAppDispatch()

  const Login = async (data : User) => {

    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if(response.status == 200){
      dispatch(login())
    } 
    
    return response.json()

    
}


  const Logout = () => {
    dispatch(logout())
  }

  const { register, handleSubmit } = useForm<IFormInput>();
    
    interface IFormInput {
        username: String;
        email: String;
        password: String;
  }

  return (
    <div>
      {
        isLogin ? (<div>
          <button onClick={Logout}>Logout</button>
          <h1>Hello {user.username} , welcome to the app!</h1>
          </div>) : (<div>
            <form onSubmit={handleSubmit(async (data: IFormInput) => {

            const userData: User = {

              username: data.username,
              email: data.email,
              password: data.password
            }

            const response = await Login(userData)

            })}>
            <input {...register("username")} id="username" placeholder="Username" required minLength={3}/> 
            <input {...register("password")} id="password" placeholder="Password" required minLength={8}/>
            <button onClick={handleSubmit} >Login</button>
            </form>
          </div>)
      }
    </div>
  )
}

