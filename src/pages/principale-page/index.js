import Button from "../../components/button";
import ModalWindow from "../../components/modal-window";
import { UilClipboardNotes } from '@iconscout/react-unicons';
import TaskCard from '../../components/task-card/index.js'
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from '../../redux/modal-slice/index'
import StatusBar from "../../components/status-bar";

const PrincipalePage = () => {
    const openModal = useSelector(state => state.modal.openModal)
    const taskList = useSelector(state => state.task.taskList)
    const dispatch = useDispatch()

    return (
        <div className="flex flex-col w-full">
            <div className='flex flex-row justify-between px-20 items-baseline mb-9'>
                <div className=' items-end capitalize text-4xl text-second-color font-semibold pt-8 h-fit flex flex-row  gap-2 '>
                    <UilClipboardNotes size="40" className="fill-third-color" />
                    all tasks
                    <StatusBar />
                </div>
                <Button handleOnClick={() => {
                    dispatch(setOpenModal(true))
                }} />
            </div>

            {openModal && <ModalWindow />}

            <div className="grid grid-cols-3 ml-5 mr-20">
                {taskList.map(task => <TaskCard task={task} />)}
            </div>

        </div>
    )
}

export default PrincipalePage;