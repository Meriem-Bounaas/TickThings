import Button from "../../components/button";
import { UilStopwatch, UilApps, UilListUl } from '@iconscout/react-unicons'
import ModalWindow from "../../components/modal-window";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from '../../redux/modal-slice/index'
import TaskCard from "../../components/task-card";
import StatusBar from "../../components/status-bar";
import { setFormat } from "../../redux/format-slice";

const InProgressPage = () => {
    const openModal = useSelector(state => state.modal.openModal)
    const taskInProgress = useSelector(state => state.task.taskList)
    const format = useSelector(state => state.format.format)
    const dispatch = useDispatch()
    
    const inProgressTasks = taskInProgress.filter(task => !task.completed).map(task => <TaskCard task={task} />)

    return (
        <div className="flex flex-col w-full">
            <div className='flex flex-row justify-between px-20 items-baseline mb-9'>
                <div className='capitalize text-4xl font-semibold text-second-color pt-8 h-fit flex flex-row items-end gap-2 '>
                    <UilStopwatch size="40" className="fill-third-color" />
                    In Progress tasks
                    <StatusBar />
                    <button onClick={() => {
                        dispatch(setFormat('grid'))
                    }}>
                        <UilApps size="20" className="fill-forth-color ml-3 " />
                    </button>
                    <button onClick={() => {
                        dispatch(setFormat('list'))
                    }}>
                        <UilListUl size="20" className="fill-forth-color " />
                    </button>
                </div>
                <Button handleOnClick={() => {
                    dispatch(setOpenModal(true))
                }} />
            </div>

            {openModal && <ModalWindow setOpenModal={setOpenModal} />}
                
            {(format === 'grid') ? 
                <div className="grid grid-cols-3 ml-5 mr-20">
                    {inProgressTasks}
                </div>: 
                <div className="flex flex-col ml-5 mr-20 w-1/2">
                    {inProgressTasks}
                </div>
            }
            
        </div>
    )
}
export default InProgressPage;