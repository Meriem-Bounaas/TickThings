import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase-config";
import src from '../../media/todo-background.jpg';
import google from '../../media/google.png'
import { useContext } from "react";
import { UilArrowCircleLeft } from '@iconscout/react-unicons'
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth-context";
import { useTranslation } from "react-i18next";
import 'react-toastify/dist/ReactToastify.css';
import { isMessage, isNotify } from "../../redux/notify-slice/index.js"
import { useDispatch } from "react-redux";
import NotificationSystem from "../../components/notification-system";


const SignUp = () => {
    const { register, getValues, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { t } = useTranslation();
    const dispatch = useDispatch();


    const signUp = async (data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password2)
            dispatch(isMessage('sucess, your account has been created'))
            navigate("/dashboard");
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    dispatch(isNotify(('Email already used!')))
                    break;
                default: break;
            }
        }
    }

    return (
        <div className="flex flex-col w-screen h-screen md:flex-row">
            <div className="md:pt-12 pt-12">
                <button className="md:ml-14 ml-8" onClick={() => {
                    navigate('/')
                }}>
                    <UilArrowCircleLeft size="40" className="fill-second-color" />
                </button>
            </div>
            <div className="md:w-1/2 h-full flex flex-col md:justify-center md:mt-0 mt-10 ">

                <span className="font-font font-semibold mb-8 text-center text-xl text-primary-color lg:text-3xl md:text-xl">
                    {t("Create an account")}
                </span>
                <form onSubmit={handleSubmit(signUp)} className="flex flex-col items-center md:mt-8 my-0 lg:mx-24 mx-6 md:mx-10 ">
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
                        className=" text-lg px-2 border-b-2 border-solid mb-4 h-12 w-full"
                    />
                    {errors.email && <p className="bg-white text-red  mb-5"> {t("* Email is not valid")}</p>}

                    <input type={"password"}
                        placeholder={t("Password")}
                        {...register("password1",
                            {
                                required: "required",
                                minLength: {
                                    value: 8,
                                }

                            })
                        }
                        className=" text-lg  px-2 border-b-2 border-solid mb-4 h-12 w-full"
                    />
                    {errors.password1 &&
                        <p className="bg-white text-red mb-5">
                            {t("* Your password must be at least 8 characters")}
                        </p>}

                    <input type={"password"}
                        placeholder={t("Confirm Password")}
                        {...register("password2", {
                            validate: (value) => {
                                const { password1 } = getValues();
                                return password1 === value || "Passwords should match!";
                            }
                        })}
                        className=" text-lg px-2 border-b-2 border-solid m-4 h-12 w-full"
                    />
                    {errors.password2 &&
                        <p className="bg-white text-red mb-5">
                            {t("* Password is not valid")}
                        </p>}

                    <button className="mt-7 bg-primary-color rounded-full h-12 text-white mb-5 text-lg md:w-3/4 w-full" >
                        {t("Create account")}
                    </button>
                </form>
            </div>
            <div className="hidden md:w-1/2 md:h-full md:block">
                <img src={src} alt="todo.img" className="h-full" />
            </div>
            <NotificationSystem />
        </div>
    )
}

export default SignUp;