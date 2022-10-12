import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../firebase-config'
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import src from '../../media/todo-background.jpg';
import { UilEye, UilEyeSlash } from '@iconscout/react-unicons'
import AuthContext from "../../auth-context";

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const { user } = useContext(AuthContext);
    const [errorMessage,setErrorMessage] = useState()

    const login = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            navigate("/dashboard")
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    setErrorMessage('user not found !')
                    break;
                default: break;
            }
        }
    }

    if (user) {
        return <Navigate replace to="/dashboard" />;
    }

    return (
        <div className="flex flex-row w-screen h-screen">
            <div className="w-1/2 h-full">
                <form onSubmit={handleSubmit(login)} className="flex flex-col mt-40 items-center">
                    <span className="font-logo text-5xl mb-14 capitalize w-1/2 text-center text-primary-color">todo list </span>
                    {errorMessage && <div className=" w-1/2 text-center text-second-color text-2xl">{errorMessage}</div>}
                    <span className="font-font text-lg capitalize w-1/2 text-sixth-color mt-3">email </span>
                    <input type={"email"}
                        placeholder={"email@mail"}
                        {...register("email",
                            {
                                required: "required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                }
                            })}
                        autoFocus={true}
                        className="border-2 border-solid w-1/2 rounded-sm h-12 text-xl mb-4 px-2"
                    />
                    {errors.email && <p className="bg-white text-red w-1/2 mb-5"> * Email is not valid </p>}
                    <span className="font-font text-lg capitalize w-1/2 text-sixth-color">password</span>
                    <div className="w-1/2 rounded-sm border-2 border-solid h-12 border-third-color mb-4">
                        <input type={showPassword ? "text" : "password"}
                            placeholder={"******"}
                            {...register("password",
                                {
                                    required: "required",
                                    // minLength: {
                                    //     value: 8,
                                    // }

                                })}
                            className=" text-xl w-full h-full px-2"
                        />
                        <button
                            className="relative -top-7 right-2 float-right"
                            onMouseDown={(e) => {
                                e.preventDefault()
                                setShowPassword(true)
                            }}
                            onMouseUp={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                setShowPassword(false)
                            }}
                        >
                            {
                                showPassword ?
                                    <UilEyeSlash size="20" className="fill-primary-color" />
                                    :
                                    <UilEye size="20" className="fill-primary-color" />
                            }
                        </button>
                    </div>

                    {errors.password && <p className="bg-white text-red w-1/2 mb-5">* Password is not valid</p>}
                    <button className="capitalize mt-2 bg-primary-color w-1/2 rounded-sm h-10 text-2xl text-white" >
                        log in
                    </button>
                    <p className="text-primary-color mt-3">
                        Don't have an account? <Link to="/signup" className="text-second-color">Sign up for free</Link>
                    </p>
                </form>
            </div>
            <div className="w-1/2 h-full">
                <img src={src} alt="todo.img" className="h-full" />
            </div>
        </div>

    )
}

export default Login;
