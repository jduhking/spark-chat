import {useForm} from 'react-hook-form'

export default function RegisterPage() {

    const { register, handleSubmit } = useForm();

    return (<div>
        <form onSubmit={handleSubmit((data) => {
            console.log(data)
        })}>
        <input {...register("email")} id="email" placeholder="Email" type="email" required minLength={4} />
        <input {...register("username")} id="username" placeholder="Username" required minLength={3}/> 
        <input {...register("passwordOne")} id="passwordOne" placeholder="Password" required minLength={8}/>
        <input {...register("passwordTwo")} id="passwordTwo" placeholder="Re-enter your password" required minLength={8}/>
        <button type="submit" >Submit</button>
        </form>
    </div> );
}

