import { UilTrashAlt, UilEditAlt, UilSchedule, UilCheckCircle, UilBookmark } from '@iconscout/react-unicons';
import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletTask, getTaskEditing, isEditTAsk, toggleCompleted } from '../../redux/task-slice';
import { setOpenModal } from '../../redux/modal-slice';
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase-config';
import 'react-toastify/dist/ReactToastify.css';
import { isNotify } from "../../redux/notify-slice/index.js";

const TaskCard = ({ task }) => {
    const [colorBtn, setColorBtn] = useState(false)
    const dispatch = useDispatch()
    const myRef = useRef(null)
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        setWidth(myRef.current.offsetWidth);
    }, [])


    const clickHandler = async (event) => {
        
        try {
            await setDoc(doc(db, "todos", task.key), {
                completed: !task.completed
            }, { merge: true });
            (task.completed === true? dispatch(isNotify("task non completed")): dispatch(isNotify("task completed")))
        } catch (error) {
            dispatch(isNotify("error in server"))
        }
        setColorBtn(!colorBtn);
        dispatch(toggleCompleted(task.key));
    };

    const descriptionLength = (description) => {
        if (width > 350) 
           return `${description.slice(0, 90)}${description.length >100?'...':''}`
        return `${description.slice(0, 30)}${description.length >30?'...':''}`
    }

    const deletTaskServer = async () => {
        await deleteDoc(doc(db, "todos", task.key));
        dispatch(deletTask(task.key))
        dispatch(isNotify("task deleted"))
    }

    const handleDelete = () => {
        // localStorage.removeItem(task.key)
        deletTaskServer()
    }

    const handleEdit = () => {
        dispatch(getTaskEditing(task.key))
        dispatch(isEditTAsk(true))
        dispatch(setOpenModal(true))
    }

    return (
        <div className="shadow m-2 p-3 lg:p-2 lg:w-11/12 h-40 hover:cursor-pointer">
            <div className='flex flex-row justify-between'>
                <h1 className={`font-title capitalize text-lg  lg:text-xl mb-3 text-primary-color ${task.completed===true ? 'line-through' : ''}`} >{task.title}</h1>
                <button onClick={clickHandler}  >
                    <UilCheckCircle size="25" className={`bounce ${task.completed === true ? "fill-green" : "fill-primary-color"}`} />
                </button>
            </div>
            <p ref={myRef} className="text-lg font-font lg:h-8 h-6 overflow-hidden" onClick={handleEdit}>{descriptionLength(task.description)}</p>

            <footer className={`flex flex-col gap-2 lg:gap-0 lg:flex-row ${task.date ? 'justify-between' : 'justify-end'} mt-4`}>
                {task.date && <div className='flex flex-row lg:text-base text-xs font-font gap-1 lg:mb-0 items-end'>
                    <UilSchedule size="25" className="fill-forth-color" />
                    {task.date}
                </div>}
                <div className='flex flex-row gap-6 justify-between lg:justify-end lg:gap-2'>
                    {task.importance && <UilBookmark size="25" className={
                        (task.importance === 'high') ? "fill-red" :
                            (task.importance === 'medium') ? "fill-orange" :
                                (task.importance === 'low') ? "fill-green" : ''
                    } />}

                    <button onClick={handleDelete}>
                        <UilTrashAlt size="25" className="fill-primary-color bounce" />
                    </button>
                    <button onClick={handleEdit}>
                        <UilEditAlt size="25" className="fill-primary-color bounce" />
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default TaskCard; 