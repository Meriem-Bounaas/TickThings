import { Link, useLocation } from 'react-router-dom';
import { UilCheckCircle, UilClipboardNotes, UilStopwatch } from '@iconscout/react-unicons'
import { useTranslation } from 'react-i18next';


const Navbar = () => {
    const { t } = useTranslation();
    let location = useLocation();

    return ( 
        <nav className='flex flex-col gap-8 text-lg font-semibold text-primaryColor capitalize w-full'>
            <Link to="/dashboard" className={`flex flex-row items-center gap-1 hover:text-thirdColor w-full  pl-8 hover:text-second-color ${location.pathname==="/dashboard"?'text-second-color border-r-4 border-second-color ':'text-primary-color'}`}>
                <UilClipboardNotes size="20" className="fill-second-color" />
                {t("all tasks")}
            </Link>
            <Link to="/dashboard/completed" className={`flex flex-row items-center gap-1 hover:text-thirdColor w-full pl-8 hover:text-second-color ${location.pathname==="/dashboard/completed"?'text-second-color border-r-4 border-second-color ':'text-primary-color'}`}>
                <UilCheckCircle size="20" className="fill-second-color" />
                {t("completed")}
            </Link>
            <Link to="/dashboard/inprogress" className={`flex flex-row items-center gap-1 hover:text-thirdColor w-full pl-8 hover:text-second-color ${location.pathname==="/dashboard/inprogress"?'text-second-color border-r-4 border-second-color ':'text-primary-color'}`}>
                <UilStopwatch size="20" className="fill-second-color" />
                {t("in progress")}
            </Link>
        </nav>
    )
}

export default Navbar;