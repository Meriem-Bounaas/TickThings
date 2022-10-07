import { UilTrashAlt, UilEditAlt, UilSchedule, UilCheckCircle, UilBookmark } from '@iconscout/react-unicons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletTask, getTaskEditing, isEditTAsk, toggleCompleted } from '../../redux/task-slice';
import { setOpenModal } from '../../redux/modal-slice';


const TaskCard = ({ task }) => {
    const [colorBtn, setColorBtn] = useState(false)
    const dispatch = useDispatch()
    const clickHandler = () => {
        setColorBtn(!colorBtn);
        dispatch(toggleCompleted(task.key));
    };

    return (
        <div className="shadow m-2 p-2  max-w-xs">
            <div className='flex flex-row justify-between'>
                {task.completed ? <h1 className="font-title capitalize text-xl ">{task.title}</h1>:
                                  <h1 className="font-title capitalize text-xl line-through ">{task.title}</h1>
                }
                <button onClick={clickHandler}>
                    <UilCheckCircle size="25" className={!task.completed ? "fill-green" : "fill-forth-color"} />

                </button>
            </div>
            <h1 className="text-lg font-font">{task.description}</h1>

            <footer className={`flex flex-row ${task.date ? 'justify-between' : 'justify-end'} mt-4`}>
                {task.date && <div className='flex flex-row font-font gap-1'><UilSchedule size="25" className="fill-second-color" /> {task.date}</div>}
                <div className='flex flex-row justify-end gap-2'>
                    {task.importance && <UilBookmark size="25" className={
                        (task.importance === 'high') ? "fill-red" :
                            (task.importance === 'medium') ? "fill-orange" :
                                (task.importance === 'low') ? "fill-green" : ''
                    } />}

                    <button onClick={() => {
                        dispatch(deletTask(task.key))
                    }}>
                        <UilTrashAlt size="25" className="fill-second-color" />
                    </button>
                    <button onClick={() => {
                        dispatch(getTaskEditing(task.key))
                        dispatch(isEditTAsk(true))
                        dispatch(setOpenModal(true))
                    }}>
                        <UilEditAlt size="25" className="fill-second-color" />
                    </button>
                </div>
            </footer>
        </div>
    )
}


export default TaskCard; 