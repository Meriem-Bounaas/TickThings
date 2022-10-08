import { useTranslation } from "react-i18next";

const Button = ({ handleOnClick, text = 'Add task' }) => {
    const { t } = useTranslation();

    return (
        <button className="button" >
            <p className="btnText capitalize text-lg">{t(text)}</p>
            <button className="btnTwo" onClick={
                handleOnClick
            }>
                <p className="btnText2 capitalize text-lg font-bold">+</p>
            </button>
        </button>
    )
}

export default Button;