import { UilTrashAlt, UilEditAlt, UilSchedule, UilCheckCircle, UilBookmark } from '@iconscout/react-unicons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletTask, getTaskEditing, isEditTAsk, toggleCompleted } from '../../redux/task-slice';
import { setOpenModal } from '../../redux/modal-slice';
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase-config';

const TaskCard = ({ task }) => {
    const [colorBtn, setColorBtn] = useState(false)
    const dispatch = useDispatch()
    const clickHandler = () => {
        setColorBtn(!colorBtn);
        dispatch(toggleCompleted(task.key));
    };

    const descriptionLength = (description) => {
        if (description.length < 45) return description
        else return `${description.slice(0, 45)}...`
    }

    const deletTaskServer = async () => {
        // const doc = await getDoc(db, "todos").filter(doc => doc.key === task.key);
        // console.log(doc);
        await deleteDoc(doc(db, "todos", task.key));
        dispatch(deletTask(task.key))
    }

    const handleDelete = () => {
        // localStorage.removeItem(task.key)
        deletTaskServer()  
    }

    const handleEdit = 
    () => {
        dispatch(getTaskEditing(task.key))
        dispatch(isEditTAsk(true))
        dispatch(setOpenModal(true))
    }

    return (
        <div key={task.key} className="shadow m-2 p-2 w-fulls h-36">
            <div className='flex flex-row justify-between'>
                <h1 className={`font-title capitalize text-xl text-primary-color ${!task.completed ? 'line-through' : ''}`} >{task.title}</h1>
                <button onClick={clickHandler}  >
                    <UilCheckCircle size="25" className={`bounce ${!task.completed ? "fill-green" : "fill-primary-color"}`} />
                </button>
            </div>
            <h1 className="text-lg font-font">{descriptionLength(task.description)}</h1>

            <footer className={`flex flex-row ${task.date ? 'justify-between' : 'justify-end'} mt-4`}>
                {task.date && <div className='flex flex-row font-font gap-1'><UilSchedule size="25" className="fill-forth-color" /> {task.date}</div>}
                <div className='flex flex-row justify-end gap-2'>
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