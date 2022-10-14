import Button from "../../components/button";
import ModalWindow from "../../components/modal-window";
import { UilClipboardNotes } from '@iconscout/react-unicons';
import TaskCard from '../../components/task-card/index.js'
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from '../../redux/modal-slice/index'
import StatusBar from "../../components/status-bar";
import { useTranslation } from "react-i18next";
import GridListView from "../../components/grid-list-view";
import ReactLoading from 'react-loading';


const PrincipalePage = () => {
    const { t } = useTranslation();
    // const { user } = useContext(AuthContext);
    const isLoading = useSelector(state => state.loading.isLoading)
    // const navigate = useNavigate();

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
                    <GridListView />
                </div>
                <Button handleOnClick={() => {
                    dispatch(setOpenModal(true))
                }} />
            </div>

            {openModal && <ModalWindow />}

            <div className={`ml-24 ${(format === 'grid') ? 'grid grid-cols-3 mr-24' : 'flex flex-col w-2/3'} `}>
                {isLoading && <ReactLoading type={'spin'} color={'#385a64'} height={300} width={100} className="ml-96 mt-28" />}
                {allTasks}
            </div>
        </div>
    )
}


export default PrincipalePage;