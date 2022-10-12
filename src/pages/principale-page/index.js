import Button from "../../components/button";
import ModalWindow from "../../components/modal-window";
import { UilClipboardNotes } from '@iconscout/react-unicons';
import TaskCard from '../../components/task-card/index.js'
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from '../../redux/modal-slice/index'
import StatusBar from "../../components/status-bar";
import { useTranslation } from "react-i18next";
import GridListView from "../../components/grid-list-view";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../auth-context";

const PrincipalePage = () => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);

    const openModal = useSelector(state => state.modal.openModal)
    const taskList = useSelector(state => state.task.taskList)
    const format = useSelector(state => state.format.format)
    const dispatch = useDispatch()
    const allTasks = taskList.map(task => <TaskCard task={task} />)

    if (!user) {
        return <Navigate replace to="/" />;
    }

    return (
        <div className="flex flex-col w-full">
            <div className='flex flex-row justify-between px-20 items-baseline mb-9'>
                <div className=' items-end capitalize text-4xl text-second-color font-semibold pt-8 h-fit flex flex-row  gap-2 '>
                    <UilClipboardNotes size="40" className="fill-third-color" />
                    {t("all tasks")}
                    <StatusBar />
                    <GridListView />
                </div>
                <Button handleOnClick={() => {
                    dispatch(setOpenModal(true))
                }} />
            </div>

            {openModal && <ModalWindow />}

            {(format === 'grid') ?
                <div className="grid grid-cols-3 ml-24 mr-24">
                    {allTasks}
                </div> :
                <div className="flex flex-col ml-24 w-2/3">
                    {allTasks}
                </div>
            }
        </div>
    )
}

export default PrincipalePage;