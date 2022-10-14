import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import src from '../../media/user.png'
import { UilEnvelope, UilPower  } from '@iconscout/react-unicons'

import { useState } from "react";

const LogOut = ({ emailUser }) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
     

    const SignOutHandler = async () => {
        try {
            await signOut(auth)
            navigate('/');
        } catch (error) {
            console.log(error.message)
        };
    }

    const handleClick = (event) => {
        setOpen(!open);
    };
  
    return (
        <div className='pr-8'>
            <button
                onClick={handleClick}
            >
                <img src={src} alt="img" className='w-12 rounded-full cursor-pointer' />
            </button>
            {
            open && (
                <div className='absolute right-2 bg-slate-50 p-3 border-2 border-slate-100 flex flex-col gap-3 rounded-lg'>
                    <button  className='hover:border-b-2 border-second-color flex flex-row gap-1'><UilEnvelope size="25" className="fill-primary-color" /> {emailUser}</button>
                    <button onClick={SignOutHandler} className='hover:border-b-2 border-second-color flex flex-row gap-1'><UilPower size="25" className="fill-primary-color" /> Deconnection</button>
                </div>)
            }
        </div>
    )
}

export default LogOut;
