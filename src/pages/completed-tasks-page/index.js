import Button from "../../components/button";
import { UilCheckCircle } from '@iconscout/react-unicons'
import ModalWindow from "../../components/modal-window";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from '../../redux/modal-slice/index';
import TaskCard from "../../components/task-card";
import StatusBar from "../../components/status-bar";
import { useTranslation } from "react-i18next";
import GridListView from "../../components/grid-list-view";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import AuthContext from "../../auth-context";
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';

const CompletedPage = () => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);
    const isLoading = useSelector(state => state.loading.isLoading)
    const navigate = useNavigate();
    const [heightPage, setHeightPage] = useState()
    const refPage = useRef()
    const [heightDives, setHeightDives]= useState()
    const [nombreDives, setNombreDives] = useState()

    const openModal = useSelector(state => state.modal.openModal);
    const taskCompleted = useSelector(state => state.task.taskList);
    const format = useSelector(state => state.format.format);
    const dispatch = useDispatch();

    const completedTasks = taskCompleted.filter(task => task.completed===true).map(task => <TaskCard task={task} />);
console.log(completedTasks)
    useLayoutEffect(() => {
        setHeightPage(refPage.current.offsetHeight);
        setHeightDives(130 * completedTasks.length)
        setNombreDives(completedTasks.length)
    }, [completedTasks.length])

    if (!user) {
        navigate("/")
    }

    return (
        <div className="flex flex-col w-full px-4 lg:p-0">
            <div className='flex flex-row justify-center items-baseline mb-9 lg:px-20 lg:justify-between'>
                <div className='items-end capitalize text-4xl text-second-color font-semibold pt-3 lg:pt-8 h-fit flex flex-row  gap-2'>
                    <div className="flex-row hidden lg:flex">
                        <UilCheckCircle size="40" className="fill-third-color" />
                        {t("completed tasks")}
                    </div>
                    <StatusBar />
                    <GridListView />
                </div>
                <Button handleOnClick={() => {
                    dispatch(setOpenModal(true))
                }} />
            </div>

            {openModal && <ModalWindow />}

            <div ref={refPage} className={`lg:mx-auto lg:h-[65vh] ${ heightDives > heightPage && (format === 'list')   ? 'overflow-y-scroll' : ''}  ${ nombreDives > 6 && (format === 'grid')   ? 'overflow-y-scroll' : ''} ${(format === 'grid') ? 'grid grid-cols-2 lg:grid-cols-3 lg:ml-24 lg:mr-24' : 'flex flex-col lg:w-2/3'} `}>
                {isLoading && <ReactLoading type={'spin'} color={'#385a64'} height={300} width={100} className="lg:ml-72 lg:mt-28 ml-28 mt-10" />}
                {completedTasks}
            </div>

        </div>
    )
}
export default CompletedPage;