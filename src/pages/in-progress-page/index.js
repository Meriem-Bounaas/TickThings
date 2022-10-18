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

    const inProgressTasks = taskInProgress.filter(task => !task.completed).map(task => <TaskCard task={task} />)

    if (!user) {
        navigate("/")
    }

    return (
        <div className="flex flex-col w-full px-4 lg:p-0">
            <div className='flex flex-row justify-center items-baseline mb-9 lg:px-20 lg:justify-between'>
                <div className='items-end capitalize text-4xl text-second-color font-semibold pt-3 lg:pt-8 h-fit flex flex-row  gap-2'>
                    <div className="flex-row hidden lg:flex">
                        <UilStopwatch size="40" className="fill-third-color" />
                        {t("in Progress tasks")}
                    </div>
                    <StatusBar />
                    <GridListView />
                </div>
                <Button handleOnClick={() => {
                    dispatch(setOpenModal(true))
                }} />
            </div>

            {openModal && <ModalWindow setOpenModal={setOpenModal} />}

            <div className={`lg:mx-auto ${(format === 'grid') ? 'grid grid-cols-2 lg:grid-cols-3 lg:ml-24 lg:mr-24' : 'flex flex-col lg:w-2/3'} `}>                {isLoading && <ReactLoading type={'spin'} color={'#385a64'} height={300} width={100} className="ml-96 mt-28" />}
                {inProgressTasks}
            </div>

        </div>
    )
}
export default InProgressPage;