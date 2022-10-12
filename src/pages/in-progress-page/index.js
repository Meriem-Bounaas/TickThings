import Button from "../../components/button";
import { UilStopwatch } from '@iconscout/react-unicons'
import ModalWindow from "../../components/modal-window";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from '../../redux/modal-slice/index'
import TaskCard from "../../components/task-card";
import StatusBar from "../../components/status-bar";
import { useTranslation } from "react-i18next";
import GridListView from "../../components/grid-list-view";
import { Navigate } from "react-router-dom";
import AuthContext from "../../auth-context";
import { useContext } from "react";

const InProgressPage = () => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);

    const openModal = useSelector(state => state.modal.openModal)
    const taskInProgress = useSelector(state => state.task.taskList)
    const format = useSelector(state => state.format.format)
    const dispatch = useDispatch()
    
    const inProgressTasks = taskInProgress.filter(task => task.completed).map(task => <TaskCard task={task} />)

    if (!user) {
        return <Navigate replace to="/" />;
    }

    return (
        <div className="flex flex-col w-full">
            <div className='flex flex-row justify-between px-20 items-baseline mb-9'>
                <div className='capitalize text-4xl font-semibold text-second-color pt-8 h-fit flex flex-row items-end gap-2 '>
                    <UilStopwatch size="40" className="fill-third-color" />
                    {t("in Progress tasks")}
                    <StatusBar />
                    <GridListView />
                </div>
                <Button handleOnClick={() => {
                    dispatch(setOpenModal(true))
                }} />
            </div>

            {openModal && <ModalWindow setOpenModal={setOpenModal} />}
                
            {(format === 'grid') ? 
                <div className="grid grid-cols-3 ml-24 mr-24">
                    {inProgressTasks}
                </div>: 
                <div className="flex flex-col ml-24 w-2/3">
                    {inProgressTasks}
                </div>
            }
            
        </div>
    )
}
export default InProgressPage;