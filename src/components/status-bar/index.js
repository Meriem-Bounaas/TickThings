import { useSelector } from "react-redux";

const StatusBar = () => {
    const allTask = useSelector(state => state.task.taskList);
    const completedTaskLength = allTask.filter(task => task.completed).length
    const inProgressTaskLength = allTask.length - completedTaskLength

    return (
        <div className="flex flex-row gap-1 text-forth-color text-xs ">
            <span>{allTask.length} <span className="text-bold">Tasks |</span></span>
            <span>{completedTaskLength} <span className="text-bold">Completed |</span></span>
            <span>{inProgressTaskLength} <span className="text-bold">InProgress</span></span>
        </div>
    )
}

export default StatusBar;