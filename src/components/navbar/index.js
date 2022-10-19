import { Link, useLocation } from 'react-router-dom';
import { UilCheckCircle, UilClipboardNotes, UilStopwatch } from '@iconscout/react-unicons'
import { useTranslation } from 'react-i18next';


const Navbar = () => {
    const { t } = useTranslation();
    let location = useLocation();

    return (
        <nav className='flex flex-row gap-4 justify-center font-semibold text-primaryColor capitalize lg:flex-col w-full'>
            <Link to="/dashboard" className={`cursor-pointer h-16 lg:h-fit rounded lg:rounded-none shadow-3xl lg:shadow-none lg:mb-5 flex flex-col w-1/3 lg:flex-row items-center gap-1 hover:text-thirdColor lg:w-full lg:pl-10 hover:text-second-color ${location.pathname === "/dashboard" ? 'lg:text-second-color lg:border-r-4 lg:border-second-color ' : 'text-primary-color'}`}>
                <UilClipboardNotes className="fill-second-color" />
                <div className='lg:text-lg text-xs text-center lg:text-start'>{t("all tasks")}</div>
            </Link>
            <Link to="/dashboard/completed" className={`cursor-pointer h-16 lg:h-fit rounded lg:rounded-none shadow-3xl lg:shadow-none lg:mb-5 flex flex-col w-1/3 lg:flex-row items-center gap-1 hover:text-thirdColor lg:w-full lg:pl-10 hover:text-second-color ${location.pathname === "/dashboard/completed" ? 'lg:text-second-color lg:border-r-4 lg:border-second-color ' : 'text-primary-color'}`}>
                <UilCheckCircle className="fill-second-color" />
                <div className='lg:text-lg text-xs text-center lg:text-start'>{t("completed")}</div>
            </Link>
            <Link to="/dashboard/inprogress" className={`cursor-pointer h-16 lg:h-fit rounded lg:rounded-none shadow-3xl lg:shadow-none  flex flex-col w-1/3 lg:flex-row items-center gap-1 hover:text-thirdColor lg:w-full lg:pl-10 hover:text-second-color  ${location.pathname === "/dashboard/inprogress" ? 'lg:text-second-color lg:border-r-4 lg:border-second-color ' : 'text-primary-color'}`}>
                <UilStopwatch className="fill-second-color" />
                <div className='lg:text-lg text-xs text-center lg:text-start'>{t("in progress")}</div>
            </Link>
        </nav>
    )
}


export default Navbar;