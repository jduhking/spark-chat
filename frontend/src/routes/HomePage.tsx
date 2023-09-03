
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { login, logout } from '../features/login/login-slice'
import axios from 'axios';



export default function HomePage() {

  const isLogin = useAppSelector((state) => state.login.value)
  const dispatch = useAppDispatch()

  const Login = () => {
    dispatch(login())
  }

  const Logout = () => {
    dispatch(logout())
  }


  return (
    <div>
      {
        isLogin ? (<button onClick={Logout}>Logout</button>) : (<button onClick={Login} >Login</button>) 
      }
    </div>
  )
}

