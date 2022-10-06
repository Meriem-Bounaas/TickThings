import { UilTrashAlt, UilEditAlt, UilSchedule, UilCheckCircle, UilBookmark } from '@iconscout/react-unicons'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deletTask, getTaskEditing, isEditTAsk, toggleCompleted } from '../../redux/task-slice'
import {setOpenModal} from '../../redux/modal-slice'

const TaskCard = ({task}) =>{
    const [colorBtn,setColorBtn] = useState(false)
    const dispatch = useDispatch()

    let colorImportance;

    if (task.importance === 'high')
        colorImportance='#a83237'
    if (task.importance === 'medium')
        colorImportance='#ff8408'
    if (task.importance === 'low')
        colorImportance='#179f4c'
    

    return(
        <div className="shadow m-2 p-2 w-1/3">

                <div className='flex flex-row justify-between'>
                    <h1 className="text-blue-600 font-title capitalize text-xl font-semibold">{task.title}</h1>
                    <button onClick={()=>{
                            setColorBtn(!colorBtn)
                            dispatch(toggleCompleted(task.key))
                        }}>
                        <UilCheckCircle size="25" color={!task.completed?'#959daa':'#179f4c'} />
                    </button>
                </div>
                <h1 className="text-lg">{task.description}</h1>

            <footer className='flex flex-row justify-between mt-4'>
                <div className='flex flex-row'><UilSchedule size="25" color="#959daa" /> {task.date}</div>
                <div className='flex flex-row justify-end gap-2'>
                    <UilBookmark size="25" color={colorImportance} />
                    <button onClick={()=>{
                            dispatch(deletTask(task.key))
                    }}>
                        <UilTrashAlt size="25" color="#959daa" />
                    </button>
                    <button  onClick={()=>{
                            dispatch(getTaskEditing(task.key))
                            dispatch(isEditTAsk(true))
                            dispatch(setOpenModal(true))
                    }}>
                        <UilEditAlt size="25" color="#959daa"/>
                    </button>
                </div>
            </footer>
        </div>
    )
}


export default TaskCard; 