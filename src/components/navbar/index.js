import { Link } from 'react-router-dom';
import { UilCheckCircle, UilClipboardNotes, UilStopwatch } from '@iconscout/react-unicons'
import { useTranslation } from 'react-i18next';


const Navbar = () => {
    const { t } = useTranslation();

    return (
        <nav className='flex flex-col gap-8 text-lg font-semibold text-primaryColor capitalize'>
            <Link to="/" className='flex flex-row items-center gap-1 hover:text-thirdColor'>
                <UilClipboardNotes size="20" className="fill-second-color" />
                {t("all tasks")}
            </Link>
            <Link to="/completed" className='flex flex-row items-center gap-1 hover:text-thirdColor capitalize'>
                <UilCheckCircle size="20" className="fill-second-color" />
                {t("completed")}
            </Link>
            <Link to="/inprogress" className='flex flex-row items-center gap-1 hover:text-thirdColor capitalize'>
                <UilStopwatch size="20" className="fill-second-color" />
                {t("in progress")}
            </Link>
        </nav>
    )
}

export default Navbar;