import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from '../../redux/modal-slice/index.js';
import { addTask, changeTask, isEditTAsk } from '../../redux/task-slice/index';
import Button from "../button";
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config.js";
import { useContext } from "react";
import AuthContext from "../../auth-context/index.js";

const ModalWindow = () => {
    const { t } = useTranslation();
    const { register, formState: { errors }, handleSubmit } = useForm();

    const isEditTask = useSelector(state => state.task.isEditTAsk)
    const taskEditing = useSelector(state => state.task.editTask)
    const dispatch = useDispatch()
    const { user } = useContext(AuthContext);

    const titleEdit = isEditTask ? taskEditing.title : ''
    const descriptionEdit = isEditTask ? taskEditing.description : ''
    const dateEdit = isEditTask ? taskEditing.date : ''
    const importanceEdit = isEditTask ? taskEditing.importance : ''
    const key = isEditTask ? taskEditing.key : uuidv4()

    const addTodoInServer = async (data) => {
        try {
             await setDoc(doc(db, "todos", data.key), {
                user : user.uid,
                key: data.key,
                completed: data.completed,
                title: data.title,
                description: data.description,
                date: data.date,
                importance: data.importance                    
            });
                dispatch(addTask({ ...data }))            
        } catch (e) {
            console.error(e);
        }
    }

    const modifyTaskToServer = async  (data) => {
        try {
            await setDoc(doc(db, "todos", data.key), {               
               completed: data.completed,
               title: data.title,
               description: data.description,
               date: data.date,
               importance: data.importance                    
           }, { merge: true });
           dispatch(changeTask({ ...data }))
           dispatch(isEditTAsk(false))
           
       } catch (e) {
           console.error(e);
       }
    }

    const onSubmit = (data) => {
        if (isEditTask) 
            modifyTaskToServer(data)            
        else 
            addTodoInServer(data)
            
        dispatch(setOpenModal(false))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSubmit(onSubmit)()
    }

    return (
        <div className="absolute top-0 left-0 bg-primary-color w-screen h-screen flex align-middle modal">
            <div className="w-1/3 h-fit bg-white rounded-sm flex flex-col m-auto justify-between p-4  ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type={'hidden'}
                        defaultValue={key}
                        {...register("key")}
                    />
                    <input
                        type={'hidden'}
                        defaultValue={false}
                        {...register("completed")}
                    />
                    <header className="flex flex-row justify-end p-2 text-second-color font-title text-xl ">
                        <button onClick={() => {
                            dispatch(setOpenModal(false))
                            dispatch(isEditTAsk(false))
                        }}>
                            X
                        </button>
                    </header>
                    <div className=" flex flex-col">
                        <span className="capitalize text-primary-color font-title">{t("title")}</span>
                        {errors.title && <p className="bg-white text-red capitalize"> {t("* title is required")}</p>}
                        <input className="border my-1 p-1 rounded-sm mb-3"
                            type={'text'}
                            placeholder={t("title")}
                            autoFocus={true}
                            defaultValue={titleEdit}
                            {...register("title", { required: true, maxLength: 20 })}
                            onKeyDown={handleKeyPress}
                        />


                        <span className="capitalize text-primary-color font-title">{t("description")}</span>
                        <textarea className="border my-1 p-1 rounded-sm mb-3"
                            rows={6}
                            placeholder={t("descreption")}
                            defaultValue={descriptionEdit}
                            {...register("description")}
                            onKeyDown={handleKeyPress}
                        />

                        <span className="capitalize text-primary-color font-title">{t("date")}</span>
                        <input className="border-b my-1 w-1/2 mb-3"
                            type={'date'}
                            defaultValue={dateEdit}
                            {...register("date")}
                        />

                        <span className="capitalize text-primary-color font-title">{t("importance")}</span>
                        <select className="border-b my-1 w-1/2"
                            defaultValue={importanceEdit}
                            {...register("importance")}
                        >
                            <option value=''></option>
                            <option value='high'>{t("high")}</option>
                            <option value='medium'>{t("medium")}</option>
                            <option value='low'>{t("low")}</option>
                        </select>

                    </div>
                    <footer className="flex flex-row justify-end">
                        <Button text={isEditTask ? 'Save task' : 'Add task'} />
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default ModalWindow;