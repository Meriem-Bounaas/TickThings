import { useForm } from "react-hook-form";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth"
import { auth } from '../../firebase-config'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import src from '../../media/todo-background.jpg';
import { UilEye, UilEyeSlash } from '@iconscout/react-unicons'
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { isNotify } from "../../redux/notify-slice/index.js"
import NotificationSystem from "../../components/notification-system";
import logo from '../../media/todo.png';
import google from '../../media/google.png'



const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false)
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            navigate("/dashboard")
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    dispatch(isNotify('user not found !'))
                    break;
                default: dispatch(isNotify('password not valide !'));
            }
        }
    }

    const signInGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            // const response = await signInWithPopup(auth, provider);
            // const credential = GoogleAuthProvider.credentialFromResult(response);
            // const token = credential.accessToken;
            // // The signed-in user info.
            // const user = response.user;
            signInWithRedirect(auth, provider);
        } catch (error) {
           
        }
    }

    return (
        <div className="flex w-screen h-screen flex-col md:flex-row">
            <div className="h-full w-full md:w-1/2 flex flex-col md:justify-center md:mt-0 mt-20 ">
                <div className="flex flex-row items-baseline gap-2   justify-center">
                    <img src={logo} alt="img" className='w-8 h-8 visible md:invisible' />
                    <span className="font-logo text-4xl capitalize text-center text-primary-color mb-10 md:mb-14 md:mr-10 md:text-3xl lg:text-5xl">todo list </span>
                </div>
                <form onSubmit={handleSubmit(login)} className="flex flex-col items-start my-0 lg:mx-24 mx-6 md:mx-10">
                    <span className="font-font text-lg capitalize  text-sixth-color mt-3">email </span>
                    <input typinve={"email"}
                        placeholdier={"email@mail"}
                        {...register("email",
                            {
                                required: "required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                }
                            })}
                        autoFocus={true}
                        className="border-2 border-solid  rounded-sm h-12 text-xl mb-4 px-2 w-full"
                    />
                    {errors.email && <p className="bg-white text-red  mb-5"> {t("* Email is not valide")} </p>}
                    <span className="font-font text-lg capitalize  text-sixth-color">{t("password")}</span>
                    <div className=" rounded-sm border-2 border-solid h-12 border-third-color mb-4  w-full">
                        <input type={showPassword ? "text" : "password"}
                            placeholder={"******"}
                            {...register("password",
                                {
                                    required: "required",

                                })}
                            className=" text-xl w-full h-full px-2"
                        />
                        <button
                            className="relative -top-9 right-2 float-right"
                            onClick={(e) => {
                                e.preventDefault()
                                setShowPassword(!showPassword)
                            }}
                        >
                            {
                                showPassword ?
                                    <UilEyeSlash size="25" className="fill-primary-color" />
                                    :
                                    <UilEye size="25" className="fill-primary-color" />
                            }
                        </button>
                    </div>

                    {errors.password && <p className="bg-white text-red  mb-5">{t("* Password is not valid")}</p>}
                    <button className="capitalize mb-4 mt-2 bg-primary-color rounded-full h-12 text-xl text-white md:text-2xl md:w-3/4 w-full my-0 mx-auto " >
                        {t('log in')}
                    </button>
                </form>
                <div className="flex justify-center flex-col md:pb-1  my-0 lg:mx-24 mx-6 md:mx-10 ">
                    <button className={`text-primary-color  rounded-full h-12 font-semibold text-sm border-third-color md:text-2xl my-0 w-full border-solid
                                        border-2 flex flex-row justify-center gap-1 pr-2 pl-2 items-center lg:font-font lg:text-xl md:w-3/4 md:mx-auto`}
                        onClick={signInGoogle}
                    >
                        <img src={google} alt="img" className='w-6' />
                        {t("Sign in with Google")}
                    </button>
                    <p className="w-3/4 text-primary-color text-center flex flex-col justify-center md:flex-col md:w-3/4 mx-auto my-4">
                        {t("Don't have an account?")}
                        <Link to="/signup" className="text-second-color">
                            {t("Sign up for free")}
                        </Link>
                    </p>
                </div>
            </div>
            <div className="hidden md:h-full md:block md:w-1/2">
                <img src={src} alt="todo.img" className="h-full" />
            </div>
            <NotificationSystem />
        </div>
    )
}

export default Login;
