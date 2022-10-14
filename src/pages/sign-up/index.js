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
import { isNotify } from "../../redux/notify-slice/index.js"
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
            const response = await createUserWithEmailAndPassword(auth, data.email, data.password2)
            if (response) {
                dispatch(isNotify('sucess, your account has been created'))
            }
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    dispatch(isNotify(('Email already used!')))
                    break;
                default: break;
            }
        }
    }

    const signUpGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const response = await signInWithPopup(auth, provider);
            if (response) {
                dispatch(isNotify('sucess, your account has been created'))
            }
            GoogleAuthProvider.credentialFromResult(response);
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    dispatch(isNotify('Email already used!'))
                    break;
                default: break;
            }
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
                    <span className="font-font text-3xl mb-14 w-1/2 text-center text-primary-color mt-4">{t("Create an account")}</span>
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
                    {errors.email && <p className="bg-white text-red w-1/2 mb-5"> {t("* Email is not valid")}</p>}

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
                        className=" text-lg  px-2 w-1/2 border-b-2 border-solid mb-4 h-12"
                    />
                    {errors.password1 && <p className="bg-white text-red w-1/2 mb-5">{t("* Your password must be at least 8 characters")}</p>}

                    <input type={"password"}
                        placeholder={t("Confirm Password")}
                        {...register("password2", {
                            validate: (value) => {
                                const { password1 } = getValues();
                                return password1 === value || "Passwords should match!";
                            }
                        })}
                        className=" text-lg px-2 w-1/2 border-b-2 border-solid m-4 h-12"
                    />
                    {errors.password2 && <p className="bg-white text-red w-1/2 mb-5">{t("* Password is not valid")}</p>}

                    <button className="mt-7 bg-primary-color w-1/2 rounded-full h-10 text-xl text-white mb-5" >
                        {t("Create account")}
                    </button>
                </form>

                <div className="flex justify-center">
                    <button className="text-primary-color w-1/2 rounded-full h-10 text-xl border-third-color border-solid border-2 flex flex-row gap-3 pl-16 items-center"
                        onClick={signUpGoogle}
                    >
                        <img src={google} alt="img" className='w-6 ' /> {t("Sign up with google")}
                    </button>

                </div>
            </div>
            <div className="w-1/2 h-full">
                <img src={src} alt="todo.img" className="h-full" />
            </div>
            <NotificationSystem />
        </div>
    )
}

export default SignUp;