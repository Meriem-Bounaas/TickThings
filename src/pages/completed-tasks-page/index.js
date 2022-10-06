import Button from "../../components/button";
import { UilCheckCircle } from '@iconscout/react-unicons'
import ModalWindow from "../../components/modal-window";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from '../../redux/modal-slice/index';
import TaskCard from "../../components/task-card";
import StatusBar from "../../components/status-bar";


const CompletedPage = () => {
    const openModal = useSelector(state => state.modal.openModal);
    const taskCompleted = useSelector(state => state.task.taskList);
    const dispatch = useDispatch();
    const completedTasks = taskCompleted.filter(task => task.completed).map(task => <TaskCard task={task} />);

    return (
        <div className="flex flex-col w-full">
            <div className='flex flex-row justify-between px-20 items-baseline mb-9'>
                <div className='capitalize text-4xl font-semibold text-second-color pt-8 h-fit flex flex-row items-center gap-2'>
                    <UilCheckCircle size="40" className="fill-third-color" />
                    completed tasks
                    <StatusBar />
                </div>
                <Button handleOnClick={() => {
                    dispatch(setOpenModal(true))
                }} />
            </div>

            {openModal && <ModalWindow />}

            <div className="grid grid-cols-2 ml-5 mr-20">
                {completedTasks}
            </div>

        </div>
    )
}
export default CompletedPage;