import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase-config";
import src from '../../media/todo-background.jpg';
import google from '../../media/google.png'
import { useContext, useState } from "react";
import ServerMessage from "../../components/server-message";
import { UilArrowCircleLeft } from '@iconscout/react-unicons'
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth-context";


const SignUp = () => {
    const { register, getValues, formState: { errors }, handleSubmit } = useForm();
    const [serverMessage, setServerMessage] = useState()
    const [isSucess, setIsSucess] = useState(false)
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);


    const signUp = async (data) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, data.email, data.password2)
            if (response) {
                setServerMessage('sucess, your account has been created')
                setIsSucess(true)
                console.log(response);
            }
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setServerMessage('Email already used!')
                    break;
                default: break;
            }
        }
    }

    const signUpGoole = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const response = await signInWithPopup(auth, provider)
            GoogleAuthProvider.credentialFromResult(response);
            
            
        } catch (error) {
            console.log(error);
        }
    }

    if (user) {
        navigate("/dashboard");
    }

    return (
        <div className="flex flex-row w-screen h-screen">
            <div className="w-1/2 h-full">
                <button className="mt-16 ml-28" onClick={() => {
                    navigate('/')
                }}>
                    <UilArrowCircleLeft size="40" className="fill-second-color" />
                </button>
                <form onSubmit={handleSubmit(signUp)} className="flex flex-col mt-20 items-center">
                    {serverMessage && <ServerMessage serverMessage={serverMessage} color={isSucess ? "green" : "second-color"} />}
                    <span className="font-font text-3xl mb-14 w-1/2 text-center text-primary-color mt-4">Create an account</span>
                    <input type={"email"}
                        placeholder={"Email"}
                        autoFocus={true}
                        {...register("email",
                            {
                                required: "required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                }
                            })
                        }
                        className=" text-lg px-2 w-1/2 border-b-2 border-solid mb-4 h-12"
                    />
                    {errors.email && <p className="bg-white text-red w-1/2 mb-5"> * Email is not valid </p>}

                    <input type={"password"}
                        placeholder={"Password"}
                        {...register("password1",
                            {
                                required: "required",
                                minLength: {
                                    value: 8,
                                }

                            })
                        }
                        className=" text-lg  px-2 w-1/2 border-b-2 border-solid mb-4 h-12"
                    />
                    {errors.password1 && <p className="bg-white text-red w-1/2 mb-5">* Password is not valid</p>}

                    <input type={"password"}
                        placeholder={"Confirm Password"}
                        {...register("password2", {
                            validate: (value) => {
                                const { password1 } = getValues();
                                return password1 === value || "Passwords should match!";
                            }
                        })}
                        className=" text-lg px-2 w-1/2 border-b-2 border-solid m-4 h-12"
                    />
                    {errors.password2 && <p className="bg-white text-red w-1/2 mb-5">* Password is not valid</p>}

                    <button className="mt-7 bg-primary-color w-1/2 rounded-full h-10 text-xl text-white mb-5" >
                        Create account
                    </button>
                </form>

                <div className="flex justify-center">
                    <button className="text-primary-color w-1/2 rounded-full h-10 text-xl border-third-color border-solid border-2 flex flex-row gap-3 pl-16 items-center"
                        onClick={signUpGoole}
                    >
                        <img src={google} alt="img" className='w-6 ' /> Sign up with google
                    </button>

                </div>
            </div>
            <div className="w-1/2 h-full">
                <img src={src} alt="todo.img" className="h-full" />
            </div>
        </div>

    )
}

export default SignUp;