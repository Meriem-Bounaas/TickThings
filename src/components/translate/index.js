import { useTranslation } from "react-i18next";
import { UilGlobe  } from '@iconscout/react-unicons'

const Translate = () => {
    const { i18n } = useTranslation();

    const OnchangeHandle=(e)=>{
        if (e.target.value === "FR") i18n.changeLanguage('fr')
        else i18n.changeLanguage('en')
    }
    return (
        <div className='pt-6 flex flex-row  gap-2 pb-3'>
            <UilGlobe  size="22" className="fill-primary-color"/>
            <select name="language" onChange={OnchangeHandle} className="text-primary-color font-font cursor-pointer text-sm lg:text-lg">
                <option className="mt-8 lg:mt-0">EN</option>
                <option>FR</option>
            </select>
        </div>
        
    )
}

export default Translate;