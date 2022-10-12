import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import src from '../../media/user.png'

const LogOut = () =>{
    const auth = getAuth();
    const navigate = useNavigate();

    const SignOutHandler = async()=> {
        try {
            await signOut(auth)
            navigate('/');
        } catch (error) {
           console.log(error.message)
        };
    }
    return(
        <button onClick={()=>{            
            SignOutHandler()
        }}>
            <img src={src} alt="img" className='w-12 rounded-3xl cursor-pointer bounce'/>
        </button>
    )
}

export default LogOut;