import Button from "../../components/button";
import { UilStopwatch } from '@iconscout/react-unicons'
import ModalWindow from "../../components/modal-window";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from '../../redux/modal-slice/index'
import TaskCard from "../../components/task-card";
import StatusBar from "../../components/status-bar";
import { useTranslation } from "react-i18next";
import GridListView from "../../components/grid-list-view";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth-context";
import { useContext } from "react";
import ReactLoading from 'react-loading';


const InProgressPage = () => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);
    const isLoading = useSelector(state => state.loading.isLoading)
    const navigate = useNavigate();


    const openModal = useSelector(state => state.modal.openModal)
    const taskInProgress = useSelector(state => state.task.taskList)
    const format = useSelector(state => state.format.format)
    const dispatch = useDispatch()

    const inProgressTasks = taskInProgress.filter(task => task.completed).map(task => <TaskCard task={task} />)

    if (!user) {
        navigate("/")
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

            <div className={`ml-24 ${(format === 'grid') ? 'grid grid-cols-3 mr-24' : 'flex flex-col w-2/3'} `}>
                {isLoading && <ReactLoading type={'spin'} color={'#385a64'} height={300} width={100} className="ml-96 mt-28" />}
                {inProgressTasks}
            </div>

        </div>
    )
}
export default InProgressPage;