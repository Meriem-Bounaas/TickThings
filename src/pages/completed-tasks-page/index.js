import Button from "../../components/button";
import { UilCheckCircle } from '@iconscout/react-unicons'
import ModalWindow from "../../components/modal-window";
import { useDispatch, useSelector } from "react-redux";
import {setOpenModal} from '../../redux/modal-slice/index'
import TaskCard from "../../components/task-card";

const CompletedPage = () =>{
    const openModal = useSelector(state => state.modal.openModal)
    const taskCompleted = useSelector(state => state.task.taskList)
    const dispatch = useDispatch()

    const completedTasks = taskCompleted.filter(task => task.completed).map(task => <TaskCard task={task}/>);
    
    return(
        <div className="flex flex-col w-full">
            <div className='flex flex-row justify-between px-20 items-baseline'>
                <div className='capitalize text-4xl font-bold text-blue-600 pt-8 h-fit flex flex-row items-center '>
                    <UilCheckCircle size="30" color="#959daa" /> 
                    completed tasks
                </div>
                <Button  handleOnClick={()=>{
                    dispatch(setOpenModal(true))
                }}/>
            </div>

            {openModal && <ModalWindow />} 

            <div className="flex flex-col ml-4">
                {completedTasks}
            </div>

        </div>
    )
}
export default CompletedPage;