import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const StatusBar = () => {
    const { t } = useTranslation();

    const allTask = useSelector(state => state.task.taskList);
    const completedTaskLength = allTask.filter(task => !task.completed).length
    const inProgressTaskLength = allTask.length - completedTaskLength

    return (
        <div className="hidden lg:block flex-row gap-1 text-forth-color text-xs capitalize ">
            <span>{allTask.length} <span className="text-bold">{t("tasks")} |</span></span>
            <span>{completedTaskLength} <span className="text-bold">{t("completed")} |</span></span>
            <span>{inProgressTaskLength} <span className="text-bold">{t("inProgress")}</span></span>
        </div>
    )
}

export default StatusBar;