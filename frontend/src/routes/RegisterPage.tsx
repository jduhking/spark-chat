import { useForm, SubmitHandler } from 'react-hook-form'
import {User} from '../models/user'

export default function RegisterPage() {

    const { register, handleSubmit } = useForm<IFormInput>();
    
    interface IFormInput {
        username: String;
        email: String;
        passwordOne: String;
        passwordTwo: String;
    }

    return (<div>
        <form onSubmit={handleSubmit((data: IFormInput) => {

            const userData: User = {

                username: data.username,
                email: data.email,
                password: data.passwordOne
            }
            fetch('http://localhost:8080/regi')
            console.log(userData)
        })}>
        <input {...register("email")} id="email" placeholder="Email" type="email" required minLength={4} />
        <input {...register("username")} id="username" placeholder="Username" required minLength={3}/> 
        <input {...register("passwordOne")} id="passwordOne" placeholder="Password" required minLength={8}/>
        <input {...register("passwordTwo")} id="passwordTwo" placeholder="Re-enter your password" required minLength={8}/>
        <button type="submit" >Submit</button>
        </form>
    </div> );
}

