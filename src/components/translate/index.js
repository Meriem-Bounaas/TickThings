import { useTranslation } from "react-i18next";

const Translate = () => {
    const { i18n } = useTranslation();

    const OnchangeHandle=(e)=>{
        if (e.target.value === "FR") i18n.changeLanguage('fr')
        else i18n.changeLanguage('en')
    }
    return (
        <div className='pt-6 pr-10 text-primary-color font-font'>
            <select name="language" onChange={OnchangeHandle}>
                <option>EN</option>
                <option>FR</option>
            </select>
        </div>
        
    )
}

export default Translate;