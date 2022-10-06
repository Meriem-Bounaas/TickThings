import { Link } from 'react-router-dom';
import { UilCheckCircle, UilClipboardNotes, UilStopwatch } from '@iconscout/react-unicons'


const Navbar = () => {

    return (
        <nav className='flex flex-col gap-8 text-lg font-semibold capitalize text-primaryColor'>
            <Link to="/" className='flex flex-row items-center gap-1 hover:text-thirdColor'>
                <UilClipboardNotes size="20" className="fill-second-color" />
                all tasks
            </Link>
            <Link to="/completed" className='flex flex-row items-center gap-1 hover:text-thirdColor'>
                <UilCheckCircle size="20" className="fill-second-color" />
                Completed
            </Link>
            <Link to="/inprogress" className='flex flex-row items-center gap-1 hover:text-thirdColor'>
                <UilStopwatch size="20" className="fill-second-color" />
                In progress
            </Link>
        </nav>
    )
}

export default Navbar;