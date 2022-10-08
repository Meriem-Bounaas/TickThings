import { useTranslation } from "react-i18next";
import { UilGlobe  } from '@iconscout/react-unicons'

const Translate = () => {
    const { i18n } = useTranslation();

    const OnchangeHandle=(e)=>{
        if (e.target.value === "FR") i18n.changeLanguage('fr')
        else i18n.changeLanguage('en')
    }
    return (
        <div className='pt-6 pr-10 text-primary-color font-font flex flex-row items-center gap-2'>
            <UilGlobe  size="22" className="fill-second-color"/>
            <select name="language" onChange={OnchangeHandle}>
                <option>EN</option>
                <option>FR</option>
            </select>
        </div>
        
    )
}

export default Translate;