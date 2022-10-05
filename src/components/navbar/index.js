import { Link } from 'react-router-dom';
import { UilCheckCircle, UilClipboardNotes, UilStopwatch } from '@iconscout/react-unicons'
 

const Navbar = () =>{
    return(
        <nav className='flex flex-col gap-8 text-lg font-semibold capitalize'>
            <Link to="/" className='flex flex-row items-center gap-1 hover:text-gray-400'><UilClipboardNotes size="20" color="#4169E1" />all tasks</Link>
            <Link to="/completed" className='flex flex-row items-center gap-1 hover:text-gray-400'><UilCheckCircle size="20" color="#4169E1" />Completed</Link>
            <Link to="/inprogress" className='flex flex-row items-center gap-1 hover:text-gray-400'><UilStopwatch size="20" color="#4169E1" />In progress</Link>
        </nav> 
    )
}

export default Navbar;