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

    const Register = async (data : User) => {

        const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        return response.json()
    }

    return (<div>
        <form onSubmit={handleSubmit(async (data: IFormInput) => {

            const userData: User = {

                username: data.username,
                email: data.email,
                password: data.passwordOne
            }

            const response = await Register(userData)
            console.log(response)
            
        })}>
        <input {...register("email")} id="email" placeholder="Email" type="email" required minLength={4} />
        <input {...register("username")} id="username" placeholder="Username" required minLength={3}/> 
        <input {...register("passwordOne")} id="passwordOne" placeholder="Password" required minLength={8}/>
        <input {...register("passwordTwo")} id="passwordTwo" placeholder="Re-enter your password" required minLength={8}/>
        <button type="submit" >Submit</button>
        </form>
    </div> );
}

