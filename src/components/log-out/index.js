import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import src from '../../media/user.png'
import { UilEnvelope, UilPower } from '@iconscout/react-unicons'
import { useState } from "react";
import { isNotify } from '../../redux/notify-slice';
import { useDispatch } from 'react-redux';
import { clearAllTask } from '../../redux/task-slice';

const LogOut = ({ emailUser }) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()


    const SignOutHandler = async () => {
         try {
            await signOut(auth)
            dispatch(clearAllTask())
            navigate('/');
        } catch (error) {
            dispatch(isNotify('error de connection'))
        };
    }

    const handleClick = (event) => {
        setOpen(!open);
    };
    const handleBlur = (e) =>{
        setTimeout (()=>{
            setOpen(false);
        }, 500)
     }

    return (
        <div className='z-10 pr-4'>
            <button
                onClick={handleClick}
                onBlur= {handleBlur}
            >
                <img src={src} alt="img" className='lg:w-11 md:w-14 w-28 rounded-full cursor-pointer' />
            </button>
            {open &&
                
                    <div className="absolute right-2 bg-slate-50 p-3 border-2 border-slate-100 flex flex-col gap-3 rounded-lg ">
                        <button className='cursor-default flex flex-row gap-1'>
                            <UilEnvelope size="25" className="fill-primary-color" />
                            {emailUser}
                        </button>
                        <button onClick={SignOutHandler} className='hover:underline hover:decoration-second-color flex flex-row gap-1'><UilPower size="25" className="fill-primary-color" /> Deconnection</button>
                    </div>
            }
        </div>
    )
}

export default LogOut;
