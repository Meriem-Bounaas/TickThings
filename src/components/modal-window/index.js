import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from '../../redux/modal-slice/index.js';
import { addTask, changeTask, isEditTAsk } from '../../redux/task-slice/index';
import Button from "../button";

const ModalWindow = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const isEditTask = useSelector(state => state.task.isEditTAsk)
    const taskEditing = useSelector(state => state.task.editTask)
    const dispatch = useDispatch()

    const titleEdit = isEditTask ? taskEditing.title : ''
    const descriptionEdit = isEditTask ? taskEditing.description : ''
    const dateEdit = isEditTask ? taskEditing.date : ''
    const importanceEdit = isEditTask ? taskEditing.importance : ''
    const key = isEditTask ? taskEditing.key : ''

    const onSubmit = (data) => {
        if (isEditTask) {
            dispatch(changeTask({ ...data }))
            dispatch(isEditTAsk(false))
        }
        else {
            dispatch(addTask({ ...data }))
        }
        dispatch(setOpenModal(false))
    }

    return (
        <div className="absolute top-0 left-0 bg-primary-color w-screen h-screen flex align-middle modal">
            <div className="w-1/3 h-fit bg-white rounded-sm flex flex-col m-auto justify-between p-4  ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type={'hidden'}
                        defaultValue={key}
                        {...register("key")}
                    />
                    <input
                        type={'hidden'}
                        defaultValue={false}
                        {...register("completed")}
                    />
                    <header className="flex flex-row justify-end p-2 text-second-color font-title text-xl ">
                        <button onClick={() => {
                            dispatch(setOpenModal(false))
                            dispatch(isEditTAsk(false))
                        }}>
                            X
                        </button>
                    </header>
                    <div className=" flex flex-col">
                        <span className="capitalize text-primary-color font-title">title</span>
                        {errors.title && <p className="bg-white text-red capitalize"> * title is required</p>}
                        <input className="border my-1 p-1 rounded-sm mb-3"
                            type={'text'}
                            placeholder='Title'
                            autoFocus={true}
                            defaultValue={titleEdit}                           
                            {...register("title", { required: true, maxLength: 20 })}
                        />
                        

                        <span className="capitalize text-primary-color font-title">description</span>
                        <textarea className="border my-1 p-1 rounded-sm mb-3"
                            rows={6}
                            placeholder='Descreption'
                            defaultValue={descriptionEdit}                           
                            {...register("description")}
                        />

                        <span className="capitalize text-primary-color font-title">date picker</span>
                        <input className="border-b my-1 w-1/2 mb-3"
                            type={'date'}
                            defaultValue={dateEdit}
                            {...register("date")}
                        />

                        <span className="capitalize text-primary-color font-title">importance</span>
                        <select className="border-b my-1 w-1/2"
                            defaultValue={importanceEdit}
                            {...register("importance")}
                        >
                            <option value=''></option>
                            <option value='high'>high</option>
                            <option value='medium'>medium</option>
                            <option value='low'>lower</option>
                        </select>

                    </div>
                    <footer className="flex flex-row justify-end">
                        <Button text={isEditTask ? 'Save task': 'Add task'} />
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default ModalWindow;