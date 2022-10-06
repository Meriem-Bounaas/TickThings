import Button from "../../components/button";
import ModalWindow from "../../components/modal-window";
import { UilClipboardNotes } from '@iconscout/react-unicons';
import TaskCard from '../../components/task-card/index.js'
import { useDispatch, useSelector } from "react-redux";
import {setOpenModal} from '../../redux/modal-slice/index'

const PrincipalePage = () =>{
    const openModal = useSelector(state => state.modal.openModal)
    const taskList = useSelector(state => state.task.taskList)
    const dispatch = useDispatch()

    return(
        <div className="flex flex-col w-full">
            <div className='flex flex-row justify-between px-20 items-baseline mb-9'>
                <div className='capitalize text-4xl font-bold text-blue-600 pt-8 h-fit flex flex-row items-center '>
                    <UilClipboardNotes size="30" color="#959daa" />
                    all tasks
                </div>
                <Button  handleOnClick={()=>{
                    dispatch(setOpenModal(true))
                }}/>
            </div>

            {openModal && <ModalWindow />}

            <div className="flex flex-col ml-4">
                {taskList.map(task => <TaskCard task={task}/>)}
            </div>
            
        </div>
    )
}

export default PrincipalePage;