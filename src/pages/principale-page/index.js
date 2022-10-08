import Button from "../../components/button";
import ModalWindow from "../../components/modal-window";
import { UilClipboardNotes, UilApps, UilListUl } from '@iconscout/react-unicons';
import TaskCard from '../../components/task-card/index.js'
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from '../../redux/modal-slice/index'
import StatusBar from "../../components/status-bar";
import { setFormat } from "../../redux/format-slice";
import { useTranslation } from "react-i18next";

const PrincipalePage = () => {
    const { t } = useTranslation();

    const openModal = useSelector(state => state.modal.openModal)
    const taskList = useSelector(state => state.task.taskList)
    const format = useSelector(state => state.format.format)
    const dispatch = useDispatch()
    
    const allTasks = taskList.map(task => <TaskCard task={task} />)

    return (
        <div className="flex flex-col w-full">
            <div className='flex flex-row justify-between px-20 items-baseline mb-9'>
                <div className=' items-end capitalize text-4xl text-second-color font-semibold pt-8 h-fit flex flex-row  gap-2 '>
                    <UilClipboardNotes size="40" className="fill-third-color" />
                    {t("all tasks")}
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

            {openModal && <ModalWindow />}

            {(format === 'grid') ? 
                <div className="grid grid-cols-3 ml-5 mr-20">
                    {allTasks}
                </div>: 
                <div className="flex flex-col ml-5 mr-20 w-1/2">
                    {allTasks}
                </div>
            }

        </div>
    )
}

export default PrincipalePage;