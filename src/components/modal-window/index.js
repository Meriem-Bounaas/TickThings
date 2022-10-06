import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 import {setOpenModal} from '../../redux/modal-slice/index.js';
import {addTask, changeTask, isEditTAsk} from '../../redux/task-slice/index';
import Button from "../button";

const ModalWindow = () =>{
    const isEditTask = useSelector(state => state.task.isEditTAsk)
    const taskEditing = useSelector(state => state.task.editTask)

    const titleEdit = taskEditing.title
    const descEdit = taskEditing.description
    const dateEdit = taskEditing.date
    const importanceEdit = taskEditing.importance
    const key = taskEditing.key

    const [title, setTitle] = useState(isEditTask? titleEdit: "")
    const [description, setDescription] = useState(isEditTask? descEdit: "")
    const [date, setDate] = useState(isEditTask? dateEdit: "")
    const [importance, setImportance] = useState(isEditTask? importanceEdit: "")

    const dispatch = useDispatch()

    const handleChangeTitle = (e) =>{
        setTitle(e.target.value)
    }
    const handleChangeDesription = (e) =>{
        setDescription(e.target.value)
    }
    const handleChangeDate = (e) =>{
        setDate(e.target.value)
    }
    const handleChangeImportance = (e) =>{
        setImportance(e.target.value)
    }


    return(
        <div className="absolute top-0 left-0 bg-slate-500 w-screen h-screen opacity-75 flex align-middle">
            <div className="w-1/3 h-fit bg-white rounded-sm flex flex-col m-auto justify-between p-4 ">
                <header className="flex flex-row justify-end p-2 text-semibold ">
                    <button onClick={()=>{
                        dispatch(setOpenModal(false))
                        dispatch(isEditTAsk(false))
                    }}>
                        X
                    </button>
                </header>
                <div className=" flex flex-col">
                    <span     className="capitalize">title</span>
                    <input    className="border border-slate-400 my-1 p-1 rounded-sm" type={'text'} placeholder='title' value={title} onChange={handleChangeTitle} />
                    <span     className="capitalize">description</span>
                    <textarea className="border border-slate-400 my-1 p-1 rounded-sm" rows={6} placeholder='descreption' value={description} onChange={handleChangeDesription} />
                    <span     className="capitalize">date picker</span>
                    <input    className="border-b border-slate-400 my-1 w-1/2" type={'date'} value={date}  onChange={handleChangeDate}/>
                    <span     className="capitalize">importance</span>
                    <select    className="border-b border-slate-400 my-1 w-1/2" value={importance} onChange={handleChangeImportance}>
                        <option value=''></option>
                        <option value='high'>high</option>
                        <option value='medium'>medium</option>
                        <option value='low'>lower</option>
                    </select>
                </div>
                <footer className="flex flex-row justify-end">
                    <Button handleOnClick={()=>{
                        if (isEditTask){
                            dispatch(changeTask({title, description, date, importance, key}))
                            dispatch(isEditTAsk(false))
                        }
                        else{
                            dispatch(addTask({title, description, date, importance, completed:false}))
                        }
                        dispatch(setOpenModal(false))

                    }}/>                    
                </footer>
            </div>
        </div>
    )
}

export default ModalWindow;